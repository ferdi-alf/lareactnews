import AdminDashboard from "@/Components/Admin/AdminDashboard";
import ChartDashboard from "@/Components/Admin/ChartDashboard";
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";

export default function Admin(props) {
    console.log("admin: ", props)
    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="admin" />


            <div className="py-12 flex flex-wrap justify-center items-center flex-col h-full">
                <AdminDashboard data={props} />
                <ChartDashboard chart={props.chartData} fromUsers={props.fromUsers.data} />
            </div>
        </AuthenticatedAdminLayout>
    )
}