"use client";

import dynamic from "next/dynamic"

const AlertProvider = dynamic(() => import("./provider").then(m => m.AlertProvider), {
  ssr: false,
})

export default AlertProvider