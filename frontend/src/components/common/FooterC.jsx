import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import './FooterC.css';

export default function FooterC() {
  return (
    <MDBFooter bgColor='dark' className='text-white pt-4 footer-custom'>
      <MDBContainer>
        <MDBRow className="text-start align-items-start">
          <MDBCol md="4" className="mb-4">
            <h6 className="fw-bold mb-3">CaseResolve</h6>
            <p className="text-light small">
              Smart solution for managing and resolving public and private complaints efficiently.
            </p>
          </MDBCol>

          <MDBCol md="4" className="mb-4">
            <h6 className="fw-bold mb-3">Services</h6>
            <ul className="footer-list">
              <li>Complaint Registration</li>
              <li>Live Complaint Tracking</li>
              <li>User & Agent Dashboards</li>
              <li>Admin Management Panel</li>
            </ul>
          </MDBCol>

          <MDBCol md="4" className="mb-4">
            <h6 className="fw-bold mb-3">Requirements</h6>
            <ul className="footer-list">
              <li>Internet Connection</li>
              <li>User Registration</li>
              <li>Valid Email/Phone</li>
              <li>Web Browser Access</li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="text-center p-3 border-top mt-3 small">
        &copy; {new Date().getFullYear()} <strong>CaseResolve</strong> — All rights reserved.
      </div>
    </MDBFooter>
  );
}
