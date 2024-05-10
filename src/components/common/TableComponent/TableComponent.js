import React from "react";
import { Table } from "antd";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { downloadExcel } from "react-export-table-to-excel";
import { useMemo } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const TableComponent = (props) => {
  const {
    isLoading = false,
    columns,
    data,
    dataDefault,
    typePage,
    onChange,
    totalPage,
    pageSize,
    currentPage,
  } = props;
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter(
      (col) =>
        col.dataIndex !== "" &&
        col.dataIndex !== "stt" &&
        col.dataIndex !== "image" &&
        col.dataIndex !== "document" &&
        col.dataIndex !== "implementer"
    );
    return arr;
  }, [columns]);

  const newColumns = newColumnExport?.map((data) => {
    const newArray = [];
    newArray.push(data.title);
    return newArray;
  });

  const header = newColumns?.map((item) => {
    return item.join();
  });
  const body2 = dataDefault?.map((item) => {
    if (typePage === "limit") {
      const {
        image,
        document,
        __v,
        _id,
        createdAt,
        updatedAt,
        key,
        implementer,
        importDate,
        importNo_VatNo,
        ...rest
      } = item;
      return rest;
    } else {
      const {
        image,
        document,
        __v,
        _id,
        createdAt,
        updatedAt,
        key,
        implementer,
        ...rest
      } = item;
      return rest;
    }
  });

  const body = body2?.map((value) => {
    var newValue = Object.values(value);
    return newValue;
  });

  const handleDownloadExcel = () => {
    downloadExcel({
      fileName: "downloadExcelFromTable",
      sheet: "react-export-table-to-excel",
      tablePayload: {
        header,
        // accept two different data structures
        body: body || body2,
      },
    });
  };
  return (
    <LoadingComponent isLoading={isLoading}>
      <div style={{ marginBottom: "10px" }}>
        <ButtonComponent
          textButton="Export Excel"
          bgButton="#3C416F"
          hoverBtn="#FE4C41"
          wButton="120px"
          paddingBtn="8px"
          onClickBtn={() => handleDownloadExcel()}
        />
      </div>
      <Table
        onRow={(record) => {
          return {
            style: {
              background:
                typePage === "import" || typePage === "export"
                  ? "none"
                  : typePage === "limit" &&
                    record.limitSetting === record.quantity
                  ? "#00E204"
                  : typePage === "limit" && record.quantity === 1
                  ? "#ff5050"
                  : "#F9D801",
            },
          };
        }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalPage || 0,
        }}
        scroll={{ x: "max-content" }}
      />
    </LoadingComponent>
  );
};

export default TableComponent;
