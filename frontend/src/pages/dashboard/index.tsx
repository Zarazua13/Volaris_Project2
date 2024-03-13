import { Outlet } from "react-router-dom"

import { Layout } from "@/components/layout"
import { AuthenticatedTemplate } from "@azure/msal-react"

export const Dashboard = () => {
  return (
    <>
      <Layout>
        <AuthenticatedTemplate>
          <Outlet />
        </AuthenticatedTemplate>
      </Layout>
    </>
  )
}