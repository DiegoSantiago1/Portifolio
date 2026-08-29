param(
    [Parameter(Mandatory = $true)]
    [string]$Source,

    [Parameter(Mandatory = $true)]
    [string]$Destination
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Format-Css {
    param([Parameter(Mandatory = $true)][string]$Text)

    $builder = [System.Text.StringBuilder]::new()
    $indent = 0
    $quote = [char]0
    $escaped = $false
    $script:atLineStart = $true

    function Add-Indent {
        if ($script:atLineStart) {
            [void]$builder.Append(('    ' * $indent))
            $script:atLineStart = $false
        }
    }

    foreach ($char in $Text.ToCharArray()) {
        if ($quote -ne [char]0) {
            Add-Indent
            [void]$builder.Append($char)
            if ($escaped) { $escaped = $false }
            elseif ($char -eq '\') { $escaped = $true }
            elseif ($char -eq $quote) { $quote = [char]0 }
            continue
        }

        if ($char -eq '"' -or $char -eq "'") {
            $quote = $char
            Add-Indent
            [void]$builder.Append($char)
        }
        elseif ($char -eq '{') {
            Add-Indent
            [void]$builder.Append(" {`r`n")
            $indent++
            $script:atLineStart = $true
        }
        elseif ($char -eq ';') {
            Add-Indent
            [void]$builder.Append(";`r`n")
            $script:atLineStart = $true
        }
        elseif ($char -eq '}') {
            if (-not $script:atLineStart) {
                [void]$builder.Append("`r`n")
            }
            $indent = [Math]::Max(0, $indent - 1)
            [void]$builder.Append(('    ' * $indent))
            [void]$builder.Append("}`r`n")
            $script:atLineStart = $true
        }
        elseif (-not [char]::IsWhiteSpace($char) -or -not $script:atLineStart) {
            Add-Indent
            [void]$builder.Append($char)
        }
    }

    return $builder.ToString().Trim() + "`r`n"
}

$sourcePath = [System.IO.Path]::GetFullPath($Source)
$destinationPath = [System.IO.Path]::GetFullPath($Destination)
$payload = [System.IO.File]::ReadAllText($sourcePath, [System.Text.UTF8Encoding]::new($false)) | ConvertFrom-Json
$document = [string]$payload.code

$styleMatch = [regex]::Match($document, '(?is)<style>\s*(.*?)\s*</style>')
$scriptMatch = [regex]::Match($document, "(?is)<script>\s*(document\.addEventListener\('DOMContentLoaded'.*?)\s*</script>\s*</body>")
if (-not $styleMatch.Success -or -not $scriptMatch.Success) {
    throw 'Não foi possível localizar o CSS ou o JavaScript próprios no HTML de origem.'
}

$html = $document.Remove($styleMatch.Index, $styleMatch.Length).Insert($styleMatch.Index, "    <link rel=`"stylesheet`" href=`"css/styles.css`">`r`n")
$scriptMatch = [regex]::Match($html, "(?is)<script>\s*(document\.addEventListener\('DOMContentLoaded'.*?)\s*</script>\s*</body>")
$html = $html.Remove($scriptMatch.Index, $scriptMatch.Length).Insert($scriptMatch.Index, "    <script src=`"js/main.js`" defer></script>`r`n</body>")
$html = $html -replace '(?is)\s*<link rel="icon"[^>]*>\s*<link rel="shortcut icon"[^>]*>', ''
$html = "<!-- Portfólio extraído e organizado localmente. -->`r`n" + $html.Trim() + "`r`n"

$cssPath = Join-Path $destinationPath 'css'
$jsPath = Join-Path $destinationPath 'js'
New-Item -ItemType Directory -Force -Path $cssPath, $jsPath | Out-Null
[System.IO.File]::WriteAllText((Join-Path $destinationPath 'index.html'), $html, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $cssPath 'styles.css'), (Format-Css $styleMatch.Groups[1].Value), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $jsPath 'main.js'), $scriptMatch.Groups[1].Value.Trim() + "`r`n", [System.Text.UTF8Encoding]::new($false))
