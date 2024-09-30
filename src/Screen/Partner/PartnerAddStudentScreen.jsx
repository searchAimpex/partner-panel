import React, { useEffect, useState } from 'react';
import { useCreateStudentMutation } from '../../slices/adminApiSlice';
import './extra.css'; // Ensure you have this CSS file
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const steps = ['Personal Details', 'Contact Details', 'Course Details', 'Documents'];
const storage = getStorage(app);

export default function PartnerAddStudentScreen() {
  const [createStudent,{isSuccess}] = useCreateStudentMutation();
  const [activeStep, setActiveStep] = useState(0);
  const {userInfo} = useSelector(state=>state.auth)
  useEffect(()=>{
    if(isSuccess){
        toast.success("Add student")
    }
  },[isSuccess])
  const [formData, setFormData] = useState({
    User: userInfo._id,
    firstName: '',
    middleName: '',
    lastName: '',
    passportNumber: '',
    dob: '',
    citizenship: '',
    gender: '',
    photo: '',
    postCode: '',
    mobileNumber: '',
    emailID: '',
    address: '',
    country: '',
    state: '',
    city: '',
    Country: '',
    Province: '',
    University: '',
    Course: '',
    grade12Marksheet: '',
    grade10Marksheet: '',
    passportFrontBack: '',
    resume: '',
    englishTestScorecard: '',
    // Optional/Additional fields
    grade10PassingCertificate: '',
    verificationForm: '',
    applicationFeeReceipt: '',
    statementOfPurpose: '',
    extracurricularCertificates: '',
    gapJustification: '',
    workExperience: '',
    universityApplicationForm: '',
    letterOfRecommendations: '',
    masterTranscripts: '',
    masterMarksheet: '',
    masterDegree: '',
    bachelorTranscripts: '',
    bachelorMarksheet: '',
    bachelorDegree: '',
    grade12PassingCertificate: '',
    powerOfAttorney: '',
    registrationForm: '',
    declarationForm: '',
    passportPhoto: '',
    portfolio: '',
    visaDocument: '',
    birthCertificate: '',
    policeClearanceCertificate: '',
    medicalCertificate: '',
  });
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      console.log("Next step triggered");
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
}
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleFileChange = async (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const file = files[0];
      const url = await uploadImage(file);
      setFormData((prevData) => ({ ...prevData, [name]: url }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        console.log("submit data",formData)
    //   await createStudent(formData).unwrap();
      // Handle success (e.g., show a success message, redirect)
    } catch (err) {
      // Handle error (e.g., show error message)
    }
  };
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `universities/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {/* Personal Details */}
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passportNumber">Passport No / Profile Evaluation UID *</label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="citizenship">Citizenship *</label>
              <input
                type="text"
                id="citizenship"
                name="citizenship"
                value={formData.citizenship}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                  required
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                  required
                /> Female
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            {/* Contact Details */}
            <div className="form-group">
              <label htmlFor="postCode">Post Code</label>
              <input
                type="text"
                id="postCode"
                name="postCode"
                value={formData.postCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile No *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailID">Email ID *</label>
              <input
                type="email"
                id="emailID"
                name="emailID"
                value={formData.emailID}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Course Details */}
            <div className="form-group">
              <label htmlFor="Country">Country *</label>
              <select
                id="Country"
                name="Country"
                value={formData.Country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a country</option>
                {/* Add country options */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Province">Province *</label>
              <select
                id="Province"
                name="Province"
                value={formData.Province}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a province</option>
                {/* Add province options */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="University">University *</label>
              <select
                id="University"
                name="University"
                value={formData.University}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a university</option>
                {/* Add university options */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Course">Course *</label>
              <select
                id="Course"
                name="Course"
                value={formData.Course}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a course</option>
                {/* Add course options */}
              </select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/* Documents */}
             <div className="form-group">
                    <label htmlFor="grade12Marksheet">Grade 12 Marksheet</label>
                    <input
                    type="file"
                    id="grade12Marksheet"
                    name="grade12Marksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="grade10Marksheet">Grade 10 Marksheet</label>
                    <input
                    type="file"
                    id="grade10Marksheet"
                    name="grade10Marksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passportFrontBack">Passport Front & Back</label>
                    <input
                    type="file"
                    id="passportFrontBack"
                    name="passportFrontBack"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Resume</label>
                    <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="englishTestScorecard">English Test Scorecard</label>
                    <input
                    type="file"
                    id="englishTestScorecard"
                    name="englishTestScorecard"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                {/* Additional/Optional document fields */}
                <div className="form-group">
                    <label htmlFor="grade10PassingCertificate">Grade 10 Passing Certificate</label>
                    <input
                    type="file"
                    id="grade10PassingCertificate"
                    name="grade10PassingCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="verificationForm">Verification Form</label>
                    <input
                    type="file"
                    id="verificationForm"
                    name="verificationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="applicationFeeReceipt">Application Fee Receipt</label>
                    <input
                    type="file"
                    id="applicationFeeReceipt"
                    name="applicationFeeReceipt"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="statementOfPurpose">Statement of Purpose</label>
                    <input
                    type="file"
                    id="statementOfPurpose"
                    name="statementOfPurpose"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="extracurricularCertificates">Extracurricular Certificates</label>
                    <input
                    type="file"
                    id="extracurricularCertificates"
                    name="extracurricularCertificates"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gapJustification">Gap Justification</label>
                    <input
                    type="file"
                    id="gapJustification"
                    name="gapJustification"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="workExperience">Work Experience</label>
                    <input
                    type="file"
                    id="workExperience"
                    name="workExperience"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="universityApplicationForm">University Application Form</label>
                    <input
                    type="file"
                    id="universityApplicationForm"
                    name="universityApplicationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="letterOfRecommendations">Letter of Recommendations</label>
                    <input
                    type="file"
                    id="letterOfRecommendations"
                    name="letterOfRecommendations"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="masterTranscripts">Master Transcripts</label>
                    <input
                    type="file"
                    id="masterTranscripts"
                    name="masterTranscripts"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="masterMarksheet">Master Marksheet</label>
                    <input
                    type="file"
                    id="masterMarksheet"
                    name="masterMarksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="masterDegree">Master Degree</label>
                    <input
                    type="file"
                    id="masterDegree"
                    name="masterDegree"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bachelorTranscripts">Bachelor Transcripts</label>
                    <input
                    type="file"
                    id="bachelorTranscripts"
                    name="bachelorTranscripts"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bachelorMarksheet">Bachelor Marksheet</label>
                    <input
                    type="file"
                    id="bachelorMarksheet"
                    name="bachelorMarksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bachelorDegree">Bachelor Degree</label>
                    <input
                    type="file"
                    id="bachelorDegree"
                    name="bachelorDegree"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="grade12PassingCertificate">Grade 12 Passing Certificate</label>
                    <input
                    type="file"
                    id="grade12PassingCertificate"
                    name="grade12PassingCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="powerOfAttorney">Power of Attorney</label>
                    <input
                    type="file"
                    id="powerOfAttorney"
                    name="powerOfAttorney"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="registrationForm">Registration Form</label>
                    <input
                    type="file"
                    id="registrationForm"
                    name="registrationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="declarationForm">Declaration Form</label>
                    <input
                    type="file"
                    id="declarationForm"
                    name="declarationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passportPhoto">Passport Photo</label>
                    <input
                    type="file"
                    id="passportPhoto"
                    name="passportPhoto"
                    onChange={handleFileChange}
                    accept="image/*"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="portfolio">Portfolio</label>
                    <input
                    type="file"
                    id="portfolio"
                    name="portfolio"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="visaDocument">Visa Document</label>
                    <input
                    type="file"
                    id="visaDocument"
                    name="visaDocument"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthCertificate">Birth Certificate</label>
                    <input
                    type="file"
                    id="birthCertificate"
                    name="birthCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="policeClearanceCertificate">Police Clearance Certificate</label>
                    <input
                    type="file"
                    id="policeClearanceCertificate"
                    name="policeClearanceCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                        
            {/* Add more file input fields as required */}
          </>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="partner-add-student-container p-5">
    <h1>Add New Student</h1>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-10 p-10">
        {renderStepContent(activeStep)}
      </div>
  
      <div className="form-navigation flex flex-row justify-between w-full">
        {activeStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="btn-back"
          >
            Back
          </button>
        )}
  
        {activeStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-next"
          >
            Next
          </button>
        ) : (
          <button
            onClick={()=>handleSubmit()}
            className="btn-submit"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  </div>
  );
}
