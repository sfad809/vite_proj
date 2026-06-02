import React, { useEffect } from 'react'

const Timer = (props) =>
{
	useEffect(() =>
	{
		console.log('starting timer...');
	}, 1000);
}

export default function Timer()
{
	return (
	<div>
		<h2>start timer</h2>
	</div>);
}
