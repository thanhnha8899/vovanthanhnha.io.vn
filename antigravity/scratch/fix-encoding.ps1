$files = @(
    'de-thi-tinhoc.html',
    'de-thi-vatli.html',
    'de-thi-toan.html',
    'de-thi-hoahoc.html',
    'de-thi-sinhhoc.html',
    'de-thi-diali.html',
    'de-thi-lichsu.html',
    'de-thi-nguvan.html',
    'de-thi-ktpl.html'
)

foreach ($f in $files) {
    $path = Join-Path $PSScriptRoot $f
    if (Test-Path $path) {
        $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
        $normalized = $content.Normalize([System.Text.NormalizationForm]::FormC)
        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
        [System.IO.File]::WriteAllText($path, $normalized, $utf8NoBom)
        Write-Host "Fixed: $f"
    } else {
        Write-Host "Skip: $f (not found)"
    }
}
Write-Host "Done!"
