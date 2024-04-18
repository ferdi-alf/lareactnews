import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataDashboard from "@/Components/Dashboard/DataDashboard";
import '../../../public/css/style.css'



export default function Dashboard(props) {
    console.log('props: ', props)

    return (
        < AuthenticatedLayout
            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 h-full">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-center boxw p-6 bg-white border-b border-gray-200">
                        <DataDashboard total={props.total} />
                    </div>
                </div>
            </div>

        </ AuthenticatedLayout >
    )
}