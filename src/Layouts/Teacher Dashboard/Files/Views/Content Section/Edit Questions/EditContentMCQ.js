import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation, useParams } from "react-router-dom";
import { updateCoursePlannings } from "../../../Apis/apiForCoursePlanning"

function EditContentMCQ() {
  let { id } = useParams();
  const location = useLocation();
  const editorRef = useRef(null);
  const history = useHistory()
  const log = (data) => {
      if (editorRef.current) {
        console.log(data)
        var contentFromTextArea = editorRef.current.getContent();
        location.state.questioncontent = contentFromTextArea
        location.state.totalmarks = data.totalmarks
        location.state.optionsQuestionMcq = data.optionsQuestionMcq
        location.state.questiontitle = data.questiontitle
        console.log(location.state)
        updateCoursePlannings(location.state, location.state._id)
        //history.push(`/content-list/${id}`)
      }
  };
  const onSubmit = async (data) => {
      
      await log(data)
      //history.push("/placement-question-details")
    }
    const formik = useFormik({
      initialValues: {
         totalmarks: location.state.totalmarks,
         questiontitle: location.state.questiontitle,
         optionsQuestionMcq: location.state.optionsQuestionMcq,
      },

      //4 Make onSubmit propert to handle what happens to data on form submisison

      onSubmit: values => {

        
        //createTodo(formik.values)
        //redirecting 
        //history.push("/")

        onSubmit(formik.values)

      },

      //5 Make validation property
      
      validate: values => {
          
          let errors = {}

          const letters = /^[A-Za-z ]+$/;

          const cnic = /^[0-9--]+$/;

          const phone = /^[0-9]+$/;

          const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
          if(!values.totalmarks){
              errors.totalmarks = "Please enter Total Marks"
          }else if (!phone.test(values.totalmarks)) {
              errors.totalmarks = "Please enter digits only"
          }else if (symbols.test(values.totalmarks)) {
              errors.totalmarks = "Please enter digits only"
          }else if (values.totalmarks > 100) {
            errors.totalmarks = "Marks for the question cannot exceed 100"
        }else if(!values.questiontitle){
          errors.questiontitle = "Please eneter a Title for the Question"
        }
          return errors


      }


  })
  const [inputList, setInputList] = useState([{ options: "",}]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    if (inputList.length > 3 ){
      return "cannot exceed more than 4 options"
    }
    
    setInputList([...inputList, { options: "",}]);
  };
  const handleTextBox = (data) => {
    formik.values.optionsQuestionMcq = data
    console.log(formik.values)
  }
 
  return (
  
                  <>
      <div>
        <div className = "mt-5 pt-4">
                      {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="containerBlackDashboard-fluid">
            {/* Page Heading */}
            <h1 className="h3BlackDashboard mb-2 text-gray-800">Course Planning</h1>
            {/* DataTales Example */}
            <div className="card shadow mb-4 text-center">
              <div className="card-header py-3" style = {{color : "white", backgroundColor : "#b4b4b4"}}>
                <h6 className="m-0 font-weight-bold text-white"> Schools Training Adult Course Content MCQ Content Editing Panel</h6>
              </div>
              <div className="card-body">
                <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className = "mt-4"> 
                      <div className="p-3 mb-2 text-white" style = {{color : "white", backgroundColor : "#b4b4b4"}}>
                          <label ><h3>Question's Title</h3></label>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                      <input type="text" placeholder="Title for Question" name="questiontitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.questiontitle} className="form-control" required  />
                      {formik.errors.questiontitle && formik.touched.questiontitle ? (<div className='error'>{formik.errors.questiontitle}</div>) : null}
                      </div>
                      <hr />
                  </div>
                  <div className = "mt-4"> 
                      <div className="p-3 mb-2 text-white" style = {{color : "white", backgroundColor : "#b4b4b4"}}>
                          <label ><h3>Please edit your desired <b>MCQ</b> Question below</h3></label>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                        <Editor
                          apiKey='zbxzyzqkm6uw6oz4uywxx4kbvw59xasjkldmya07y0hfjupf'
                          onInit={(evt, editor) => editorRef.current = editor}
                          initialValue={location.state.questioncontent}
                          init={{
                          height: 500,
                          browser_spellcheck : true,
                          menubar: false,
                          plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | formatselect | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }}
                        />  
                      </div>
                      <hr />
                  </div>
                  <div className = "mt-4"> 
                      <div className="p-3 mb-2 text-white" style = {{color : "white", backgroundColor : "#b4b4b4"}}>
                          <label ><h3>Options</h3></label>
                          <p>Please click <i>Add Option</i> to add more options and <i>Remove option</i> to remove the desired option.</p>
                          <p><b>Disclaimer:</b> Total number of Options cannot exceed more than four. Only four Options are allowed to be created.</p>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                        {inputList.map((x, i) => {
                        return (
                            <div className="box">
                            <input
                                    name="options"
                                    placeholder="Enter Option"
                                    value={x.options}
                                    onChange={e => handleInputChange(e, i)}
                            />
                            <div className="btn-box">
                                {inputList.length !== 1 && <button
                                className="mr10 btn btn-light m-3"
                                onClick={() => handleRemoveClick(i)}>Remove Option</button>}
                                
                                {inputList.length - 1 === i && <button className = "btn btn-light m-3" onClick={handleAddClick}>Add Option</button>}
                            </div>
                            </div>
                        );
                        })}
                      </div>
                      {handleTextBox(inputList)}
                      <hr />
                  </div>
                  <div>
                    <div className = "mt-4"> 
                        <div className="p-3 mb-2 text-white" style = {{color : "white", backgroundColor : "#b4b4b4"}}>
                            <label ><h3>Total Marks</h3></label>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                              {/*2 put onChange = {formkit.handleChange} value={formik.values.name} in all the form fields with their corroposind name  in values */}
                              <input type="text" placeholder="Total Marks for the Question" name="totalmarks" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.totalmarks} className="form-control" required  />
                              {formik.errors.totalmarks && formik.touched.totalmarks ? (<div className='error'>{formik.errors.totalmarks}</div>) : null}
                        </div>
                        <hr />
                    </div>
                  </div>
                  <div className="buttonNewTheme mt-3 mb-3">
                                  <button type="submit" className="btnSass play-pause buttonSass" style = {{fontWeight : "bold", height: "120px", width: "120px" }} >
                                    Save Changes
                                  </button>
                                </div>
                      </form>
                </div>
              </div>
            </div>
          </div>
          {/* /.containerBlackDashboard-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="containerBlackDashboard my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Logistics 2021</span>
            </div>
            </div>
          </footer>
          {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
          {/* End of Page Wrapper */}
                </div>
                </div>
              </>

  );
}

export default EditContentMCQ
