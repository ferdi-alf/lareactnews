import AdminDashboard from "@/Components/Admin/AdminDashboard";
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";


export default function Admin(props) {
    return (
        <AuthenticatedAdminLayout>
            <Head title="admin" />


            <div className="py-12 flex flex-wrap justify-center items-center flex-col h-full">
                <AdminDashboard />
            </div>
        </AuthenticatedAdminLayout>
    )
}