import { NextResponse } from "next/server";
import { getSettings } from "@/lib/data";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({
    phone: settings.phone,
    phoneDisplay: settings.phoneDisplay,
    whatsapp: settings.whatsapp,
    email: settings.email,
    address: settings.address,
    addressFull: settings.addressFull,
    city: settings.city,
    lat: settings.lat,
    lng: settings.lng,
    workingHours: settings.workingHours,
    workingHoursFriday: settings.workingHoursFriday,
    siteName: settings.name,
  });
}
