# Gandalf theme — register / unregister the plugin in the DSH Web profile
# patch file (~/.dsh/profiles/web/cordis.patch.yml).
# Used by install.cmd / uninstall.cmd. Idempotent: install always points at
# THIS repo's built bundle; uninstall removes the block entirely.

param(
  [Parameter(Mandatory = $true)][string]$RepoRoot,
  [switch]$Uninstall
)
$ErrorActionPreference = 'Stop'

# Tolerate a trailing backslash (cmd %~dp0 form).
$RepoRoot = $RepoRoot.TrimEnd('\', '/')

$profileDir = Join-Path $env:USERPROFILE '.dsh\profiles\web'
if (-not (Test-Path $profileDir)) {
  Write-Host "[theme-patch] profile dir not found: $profileDir"
  Write-Host "[theme-patch] Run 'dsh web' once so the profile exists, then retry."
  exit 2
}

$patchPath = Join-Path $profileDir 'cordis.patch.yml'
$absPlugin = (Join-Path $RepoRoot 'plugin\lib\index.js')

# Read existing lines (empty file / missing file -> empty list).
$lines = @()
if (Test-Path $patchPath) { $lines = @(Get-Content $patchPath) }

# Split into top-level blocks. A block starts at a line with no leading space
# (top-level YAML key, list item, or comment). Consecutive comment lines merge
# into the following block so install/uninstall keep header comments intact.
$blocks = [System.Collections.Generic.List[object]]::new()
$current = [System.Collections.Generic.List[string]]::new()
foreach ($line in $lines) {
  $isComment = $line -match '^\s*#'
  $isTopLevel = $line -match '^\S'
  if ($isTopLevel -and -not ($isComment -and $current.Count -gt 0 -and $current[$current.Count - 1] -match '^\s*#')) {
    if ($current.Count -gt 0) { $blocks.Add(@($current)); $current = [System.Collections.Generic.List[string]]::new() }
  }
  $current.Add($line)
}
if ($current.Count -gt 0) { $blocks.Add(@($current)) }

$hasGandalf = $false
$kept = [System.Collections.Generic.List[object]]::new()
foreach ($block in $blocks) {
  if ($block -match 'id:\s*gandalf-theme') { $hasGandalf = $true; continue }
  $kept.Add($block)
}

if ($Uninstall) {
  if (-not $hasGandalf) {
    Write-Host '[theme-patch] gandalf-theme not registered; nothing to do.'
    exit 0
  }
  $content = ($kept | ForEach-Object { $_ -join "`r`n" }) -join "`r`n`r`n"
  if ($content.Trim().Length -gt 0) {
    Set-Content -Path $patchPath -Value $content.TrimEnd() -Encoding UTF8
  } else {
    Set-Content -Path $patchPath -Value '' -Encoding UTF8
  }
  Write-Host "[theme-patch] removed gandalf-theme from $patchPath"
  Write-Host '[theme-patch] Restart "dsh web" to restore the default appearance.'
  exit 0
}

# Install: replace any existing block, then append a fresh one at the end.
$newBlock = @(
  '- insert:',
  '    - id: gandalf-theme',
  "      name: '$absPlugin'"
)
$kept.Add($newBlock)
$content = ($kept | ForEach-Object { $_ -join "`r`n" }) -join "`r`n`r`n"
Set-Content -Path $patchPath -Value $content -Encoding UTF8

if ($hasGandalf) {
  Write-Host '[theme-patch] updated gandalf-theme registration (idempotent).'
} else {
  Write-Host '[theme-patch] registered gandalf-theme.'
}
Write-Host "[theme-patch]   patch: $patchPath"
Write-Host "[theme-patch]   bundle: $absPlugin"
Write-Host '[theme-patch] Restart "dsh web" to activate.'
