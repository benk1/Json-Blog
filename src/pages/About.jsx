import { MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import React from 'react';
import Pagination from '../components/Pagination';

const About = () => {
	return (
		<div style={{ marginTop: '100px' }}>
			<MDBContainer>
				<MDBTypography note noteColor="primary">
					This is A blog where you will find some post related to different
					categories like Travel, Food, Fitness,Tech and Fashion. Be free to add
					your adventures and Passion.
				</MDBTypography>
			</MDBContainer>
		</div>
	);
};

export default About;
