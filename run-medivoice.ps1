$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host ''
  Write-Host 'Node.js 18+ is required to run the secure MediVoice live test.' -ForegroundColor Red
  Write-Host 'Install Node.js from the official Node.js website, then run this file again.' -ForegroundColor Yellow
  Read-Host 'Press Enter to close'
  exit 1
}

$versionText = (node --version).TrimStart('v')
$major = [int]($versionText.Split('.')[0])
if ($major -lt 18) {
  Write-Host "Node.js $versionText found. Version 18+ is required." -ForegroundColor Red
  Read-Host 'Press Enter to close'
  exit 1
}

Write-Host ''
Write-Host 'MediVoice — AssemblyAI Live Test' -ForegroundColor Cyan
Write-Host 'Your API key is used only in this PowerShell session and is never written to a file.' -ForegroundColor Gray
$secureKey = Read-Host 'Paste your AssemblyAI API key (input stays hidden)' -AsSecureString
$credential = New-Object System.Management.Automation.PSCredential('assemblyai', $secureKey)
$env:ASSEMBLYAI_API_KEY = $credential.GetNetworkCredential().Password

if ([string]::IsNullOrWhiteSpace($env:ASSEMBLYAI_API_KEY)) {
  Write-Host 'No API key entered.' -ForegroundColor Red
  exit 1
}

Write-Host 'Starting secure local MediVoice server...' -ForegroundColor Green

$server = Start-Process -FilePath 'node' -ArgumentList 'server.js' -NoNewWindow -PassThru
Start-Sleep -Seconds 1
Start-Process 'http://localhost:3000/voice-intake-agent.html'

try {
  $server.WaitForExit()
}
finally {
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
  Remove-Item Env:ASSEMBLYAI_API_KEY -ErrorAction SilentlyContinue
}
