import Link from "next/link";

export default function Pagination(props) {
  return (
    <>
      {props.page > 1 && (
        <Link href={`/events?page=${props.page - 1}`} legacyBehavior>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {props.page < props.lastPage && (
        <Link href={`/events?page=${props.page + 1}`} legacyBehavior>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
}
