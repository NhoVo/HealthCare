// lib
import classNames from "classnames/bind";
import { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

// me
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import images from "../../assets/images/index";
import ModelWrapper from "../ModelWrapper/ModelWrapper";
import styles from "./FileMessage.module.scss";

const cx = classNames.bind(styles);

function FileMessage({ message }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [previewFile, setPreviewFile] = useState(false);

  const handlePreviewFile = () => {
    setPreviewFile(true);
  };

  // handle preview file
  const handleViewer = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <>
      {message.file[0].name.split(".")[
        message.file[0].name.split(".").length - 1
      ] === "txt" && (
        <div className={cx("files")}>
          <button className={cx("preview-file")} onClick={handlePreviewFile}>
            <img
              className={cx("img-icon")}
              src={images.blankIcon}
              alt="icon-file"
            />
          </button>

          {/* show preview file */}
          {previewFile && (
            <ModelWrapper className={cx("model-preview")} open={previewFile}>
              <center>
                <button
                  className={cx("close-btn")}
                  onClick={() => setPreviewFile(false)}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    className={cx("close-icon")}
                  />
                </button>
                <div className={cx("model-preview-file")}>
                  {/* "/KTPM_Design_Web_App_N2_V4.pdf" - "/tai-lieu-hdsd-v2.pdf" */}
                  <Document
                    file={message.file[0].name}
                    onLoadSuccess={handleViewer}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                </div>
              </center>
            </ModelWrapper>
          )}

          <a href={message.fileLink} download className={cx("download-file")}>
            <div className={cx("display")}>
              <p className={cx("name-file")}>
                {
                  message.file[0].name.split("/")[
                    message.file[0].name.split("/").length - 1
                  ]
                }
              </p>
            </div>
          </a>
        </div>
      )}
      {message.file[0].name.split(".")[
        message.file[0].name.split(".").length - 1
      ] === "xlsx" && (
        <div className={cx("files")}>
          <a
            href={message.file[0].url}
            download
            className={cx("download-file")}
          >
            <img
              className={cx("img-icon")}
              src={images.excelIcon}
              alt="icon-file"
            />

            <div className={cx("display")}>
              <p className={cx("name-file")}>
                {
                  message.file[0].name.split("/")[
                    message.file[0].name.split("/").length - 1
                  ]
                }
              </p>
            </div>
          </a>
        </div>
      )}
      {message.file[0].name.split(".")[
        message.file[0].name.split(".").length - 1
      ] === "csv" && (
        <div className={cx("files")}>
          <a
            href={message.file[0].url}
            download
            className={cx("download-file")}
          >
            <img
              className={cx("img-icon")}
              src={images.excelIcon}
              alt="icon-file"
            />

            <div className={cx("display")}>
              <p className={cx("name-file")}>
                {
                  message.file[0].name.split("/")[
                    message.file[0].name.split("/").length - 1
                  ]
                }
              </p>
            </div>
          </a>
        </div>
      )}
      {message.file[0].name.split(".")[
        message.file[0].name.split(".").length - 1
      ] === "pptx" && (
        <div className={cx("files")}>
          <a
            href={message.file[0].url}
            download
            className={cx("download-file")}
          >
            <img
              className={cx("img-icon")}
              src={images.pdfIcon}
              alt="icon-file"
            />

            <div className={cx("display")}>
              <p className={cx("name-file")}>
                {
                  message.file[0].name.split("/")[
                    message.file[0].name.split("/").length - 1
                  ]
                }
              </p>
            </div>
          </a>
        </div>
      )}
      {message.file[0].name.split(".")[
        message.file[0].name.split(".").length - 1
      ] === "pdf" && (
        <div className={cx("files")}>
          <button className={cx("preview-file")} onClick={handlePreviewFile}>
            <img
              className={cx("img-icon")}
              src={images.pdfIcon}
              alt="icon-file"
            />
          </button>
          {/* show preview file */}
          {previewFile && (
            <ModelWrapper className={cx("model-preview")} open={previewFile}>
              <center>
                <button
                  className={cx("close-btn")}
                  onClick={() => setPreviewFile(false)}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    className={cx("close-icon")}
                  />
                </button>
                <div className={cx("model-preview-file")}>
                  {/* "/KTPM_Design_Web_App_N2_V4.pdf" - "/tai-lieu-hdsd-v2.pdf" */}
                  <Document
                    file={message.file[0].name}
                    onLoadSuccess={handleViewer}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                  </Document>
                </div>
              </center>
            </ModelWrapper>
          )}

          <a
            href={message.file[0].url}
            download
            className={cx("download-file")}
          >
            <div className={cx("display")}>
              <p className={cx("name-file")}>
                {
                  message.file[0].name.split("/")[
                    message.file[0].name.split("/").length - 1
                  ]
                }
              </p>
            </div>
          </a>
        </div>
      )}
      {message.file[0].name.split(".")[
        message.file[0].name.split(".").length - 1
      ] === "docx" && (
        <div className={cx("files")}>
          <a
            href={message.file[0].url}
            download
            className={cx("download-file")}
          >
            <img
              className={cx("img-icon")}
              src={images.wordIcon}
              alt="icon-file"
            />

            <div className={cx("display")}>
              <p className={cx("name-file")}>
                {
                  message.file[0].name.split("/")[
                    message.file[0].name.split("/").length - 1
                  ]
                }
              </p>
            </div>
          </a>
        </div>
      )}
    </>
  );
}

export default FileMessage;
