import React, { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { IconBold, IconItalic, IconUnderline, IconStrikethrough, IconOrderedList, IconUnorderedList, IconH1, IconH2, IconJustifyLeft, IconJustifyCenter, IconJustifyRight, IconIndent, IconOutdent, IconBlockquote, IconLink, IconImage, IconEdit, IconCode } from "/imports/ui/components/Icons";
import "/imports/ui/components/TextEditor/styles.css";

export const TextEditor = ({ field, html, disabled, enableEditor, sanitize, placeholder, saveCallback }) => {
	const [activeRawEditor, setActiveRawEditor] = useState(false);
	const editorInput = useRef();

	const handleSave = (event) => {
		const initialHtml = html;
		const el = editorInput.current;
		const newHtml = el ? el.innerHTML : event.target.value; // gets html depending of the input type (contenteditable or textarea)

		if (initialHtml !== newHtml) {
			const newEvent = Object.assign({}, event, {
				target: { name: field, value: sanitize ? DOMPurify.sanitize(newHtml) : newHtml }
			});
			saveCallback(newEvent);
		}
	};

	const handlePaste = (event) => {
		event.preventDefault();
		const text = event.clipboardData.getData("text/plain");
		document.execCommand("insertHTML", false, sanitize ? DOMPurify.sanitize(text) : text);
	};

	const toggleEditor = () => {
		setActiveRawEditor(!activeRawEditor);
	};

	const generateLink = (url) => {
		const pattern = /^((http|https|ftp):\/\/)/;
		return !pattern.test(url) ? `https://${url}` : url;
	};

	return (
		<div className="contenteditable-container">
			{enableEditor &&
				<div className="contenteditable-actions">
					<EditorButton cmd="bold" icon={IconBold} />
					<EditorButton cmd="italic" icon={IconItalic} />
					<EditorButton cmd="underline" icon={IconUnderline} />
					<EditorButton cmd="strikeThrough" icon={IconStrikethrough} />
					<EditorButton cmd="insertOrderedList" icon={IconOrderedList} />
					<EditorButton cmd="insertUnorderedList" icon={IconUnorderedList} />

					<EditorButton cmd="formatBlock" icon={IconH1} arg="h1" />
					<EditorButton cmd="formatBlock" icon={IconH2} arg="h2" />

					<EditorButton cmd="justifyLeft" icon={IconJustifyLeft} />
					<EditorButton cmd="justifyCenter" icon={IconJustifyCenter} />
					<EditorButton cmd="justifyRight" icon={IconJustifyRight} />
					<EditorButton cmd="indent" icon={IconIndent} />
					<EditorButton cmd="outdent" icon={IconOutdent} />

					<EditorButton cmd="formatBlock" icon={IconBlockquote} arg="blockquote" />

					<EditorButton icon={IconLink} func={() => {
						const linkUrl = prompt("Enter the URL");
						const selection = document.getSelection();
						document.execCommand("createLink", false, generateLink(linkUrl));
						selection.anchorNode.parentElement.target = "_blank"; // Url will be opened always in a new tab
						selection.anchorNode.parentElement.rel = "noopener"; // Avoid malicious usage of external url
					}} />

					<EditorButton icon={IconImage} func={() => {
						const imageUrl = prompt("Paste image url here");
						document.execCommand("insertHTML", false, `<img src="${imageUrl}">`);
					}} />

					<span onClick={toggleEditor} style={{ width:"auto" }}>
						{activeRawEditor ? <IconEdit /> : <IconCode />}
					</span>
				</div>
			}

			{activeRawEditor ? (
				<textarea
					className="contenteditable-source"
					defaultValue={ html }
					onBlur={ handleSave }
					placeholder="Write your html code here"
				/>
			) : (
				<div
					ref={ editorInput }
					className="contenteditable-editor"
					dangerouslySetInnerHTML={{ __html: html }}
					contentEditable={ !disabled }
					placeholder={ placeholder ? placeholder : "Write your text here" }
					onBlur={ handleSave }
					onPaste={ handlePaste }
				/>
			)}
		</div>
	);
};

const EditorButton = ({ icon: RenderIcon, cmd, arg, func }) => {
	const handleClick = (event) => {
		event.preventDefault(); // Avoids loosing focus from the editable area
		func ? func() : document.execCommand(cmd, false, arg);
	};

	return (
		<span onMouseDown={handleClick}>
			<RenderIcon />
		</span>
	);
};
