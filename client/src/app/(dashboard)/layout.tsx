'use client'
import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DashboardLayout = ({children}: {children : React.ReactNode}) => {
  const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    if(authUser){
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants"))||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ){
        router.push(
          userRole === "manager"
          ? "/managers/properties"
          : "/tenants/favorites"
        , {scroll: false});
      }else{
        setIsLoading(false)
      }
    }
  },[authUser, router, pathname])
  if(authLoading || isLoading) return <>Loading...</> 
  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
    <div className="min-h-screen bg-primary-100">
      <Navbar />

      {/* This wrapper only pushes content below the navbar */}
      <div style={{ paddingTop: NAVBAR_HEIGHT }}>
        <div className="flex">
          {/* Sidebar stays fixed/inset – no changes needed */}
          <AppSidebar userType="tenant" />

          {/* Content area – NO z-index, just left padding on large screens */}
          <main className="flex-1 min-h-screen pl-0 lg:pl-72 transition-padding duration-300">
            <div className="p-4 pt-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  </SidebarProvider>
  )
}

export default DashboardLayout