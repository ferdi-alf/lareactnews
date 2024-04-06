import { Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {

    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div className="">
            <div className="join ">
                {prev && <Link Link href={prev} className="join-item text-slate-900  btn btn-outline">«</Link>}
                <Link className="join-item text-slate-900 btn btn-outline text">{current}</Link>
                {next && <Link href={next} className="join-item text-slate-900  btn btn-outline">»</Link>}
            </div>
        </div>
    )
}

export default Paginator