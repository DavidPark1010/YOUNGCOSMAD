import { useState } from 'react'
import { defaultSettings, defaultAiPolicy } from '../constants/defaultSettings'

export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings)
  const [aiPolicy, setAiPolicy] = useState(defaultAiPolicy)
  const [settingsSaved, setSettingsSaved] = useState(false)

  const saveSettings = () => {
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2000)
  }

  return {
    settings, setSettings,
    aiPolicy, setAiPolicy,
    settingsSaved,
    saveSettings
  }
}
