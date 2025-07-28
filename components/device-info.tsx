"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone, Tablet } from "lucide-react"

export function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    type: "desktop",
    screen: "",
    browser: "",
    os: "",
    online: true,
  })

  useEffect(() => {
    const getDeviceType = () => {
      const width = window.innerWidth
      if (width < 768) return "mobile"
      if (width < 1024) return "tablet"
      return "desktop"
    }

    const getBrowserInfo = () => {
      const ua = navigator.userAgent
      if (ua.includes("Chrome")) return "Chrome"
      if (ua.includes("Firefox")) return "Firefox"
      if (ua.includes("Safari")) return "Safari"
      if (ua.includes("Edge")) return "Edge"
      return "Unknown"
    }

    const getOSInfo = () => {
      const ua = navigator.userAgent
      if (ua.includes("Windows")) return "Windows"
      if (ua.includes("Mac")) return "macOS"
      if (ua.includes("Linux")) return "Linux"
      if (ua.includes("Android")) return "Android"
      if (ua.includes("iOS")) return "iOS"
      return "Unknown"
    }

    const updateDeviceInfo = () => {
      setDeviceInfo({
        type: getDeviceType(),
        screen: `${window.innerWidth}×${window.innerHeight}`,
        browser: getBrowserInfo(),
        os: getOSInfo(),
        online: navigator.onLine,
      })
    }

    updateDeviceInfo()
    window.addEventListener("resize", updateDeviceInfo)
    window.addEventListener("online", updateDeviceInfo)
    window.addEventListener("offline", updateDeviceInfo)

    return () => {
      window.removeEventListener("resize", updateDeviceInfo)
      window.removeEventListener("online", updateDeviceInfo)
      window.removeEventListener("offline", updateDeviceInfo)
    }
  }, [])

  const getDeviceIcon = () => {
    switch (deviceInfo.type) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          {getDeviceIcon()}
          Device Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>Device Type:</div>
          <Badge variant="outline" className="text-xs">
            {deviceInfo.type}
          </Badge>
          <div>Screen Size:</div>
          <Badge variant="outline" className="text-xs">
            {deviceInfo.screen}
          </Badge>
          <div>Browser:</div>
          <Badge variant="outline" className="text-xs">
            {deviceInfo.browser}
          </Badge>
          <div>OS:</div>
          <Badge variant="outline" className="text-xs">
            {deviceInfo.os}
          </Badge>
          <div>Status:</div>
          <Badge variant={deviceInfo.online ? "default" : "destructive"} className="text-xs">
            {deviceInfo.online ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
