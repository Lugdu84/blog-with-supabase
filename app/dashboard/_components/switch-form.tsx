'use client'

import { Switch } from '@/components/ui/switch'

type SwithFormProps = {
  checked: boolean
  onToggle: () => void
}

export default function SwithForm({ checked, onToggle }: SwithFormProps) {
  return <Switch defaultChecked={checked} onCheckedChange={() => onToggle()} />
}
