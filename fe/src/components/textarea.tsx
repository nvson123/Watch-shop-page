import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextareaDescription = ({ apiKey, value, onChange, ...rest }) => {
    return (
        <Editor
            apiKey={apiKey}
            value={value}
            init={{
                height: 300,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | fontselect fontsizeselect | ' +
                    'bold italic underline | forecolor backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | removeformat',
            }}
            onEditorChange={onChange} // Gọi hàm onChange khi nội dung thay đổi
            {...rest} // Truyền các thuộc tính khác
        />
    );
};

export default TextareaDescription;
