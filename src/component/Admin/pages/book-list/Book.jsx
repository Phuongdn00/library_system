import { DataGrid } from "@material-ui/data-grid";
import { useEffect, useState } from "react";
import get_list_book from "../../../../api/admin/get_list_book";
import "./book-list.css";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "book_name",
    headerName: "Book name",
    width: 100,
  },
  {
    field: "book_quantity",
    headerName: "Quantity",
    width: 100,
  },

  {
    field: "book_rating",
    headerName: "Rating",
    width: 90,
    renderCell: (params)=> {
      return parseFloat(params.row?.book_rating).toFixed(1)
    }
  },
  {
    field: "book_description",
    headerName: "Book description",
    width: 200,
  },
  {
    field: "author_name",
    headerName: "Author",
    width: 200,
  },
  {
    field: "link_book",
    headerName: "Link book",
    width: 100,
  },
  {
    field: "cover_photo",
    headerName: "Cover photo book",
    height: "auto",
    renderCell: (params) => {
      return (
        <img
          style={{ width: 130, aspectRatio: 2 / 3, borderRadius: 10 }}
          alt={""}
          src={params?.row?.cover_photo}
        />
      );
    },
  },
];

export default function BookList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await get_list_book();
      return setData(result);
    })();
  }, []);
  return (
    <div className="product">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        checkboxSelection
        getRowHeight={() => 'auto'}
        pageSize={5}
        pagination={true}
        paginationMode="client"
      />
    </div>
  );
}
