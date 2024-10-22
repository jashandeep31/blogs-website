import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
const CKEditorComponent = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="ck-editor ">
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: ["undo", "redo", "|", "bold", "italic"],
          },
          plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
          licenseKey: "<YOUR_LICENSE_KEY>",
          initialData: value,
        }}
        onChange={(event, editor) => {
          setValue(editor.getData());
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
