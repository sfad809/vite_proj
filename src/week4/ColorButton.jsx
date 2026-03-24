export default function ColorButton({text, bgColor})
{
	return (<>
		<button style={{ backgroundColor: bgColor, color:"white" }}>
			{text}
		</button>
	</>)
}