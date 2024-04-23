import TablePending from "@/Components/Admin/TablePending";
import AuthenticatedAdminLayout from "@/Layouts/AuthenticatedAdminLayout";
import { Head } from "@inertiajs/react";


export default function PendingNews(props) {
    console.log("data: ", props)

    return (
        <AuthenticatedAdminLayout
            admin={props.auth.admin}
        >
            <Head title="admin" />

            <div className="py-12 flex flex-wrap justify-center items-center flex-col">
                <TablePending data={props.pendingNews.data} />
            </div>
        </AuthenticatedAdminLayout>
    )
}