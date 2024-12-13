import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getApi } from "../../../api/apiInstance";

export default function InterviewsOnePage() {
	const api = getApi();
	const { id } = useParams();

	const [interview, setInterview] = useState({});

	const [employees, setEmployees] = useState([]);

	const [finalAssessment, setFinalAssessment] = useState("Y");
	const [finalComment, setFinalComment] = useState();

	const [appraiser, setAppraiser] = useState();
	const [appraiserAssessment, setAppraiserAssessment] = useState("Y");
	const [skills, setSkills] = useState([]);

	const [canEdit, setCanEdit] = useState(false);

	function checkEdit(interv) {
		let isEdit = true;

		if (interv.interviewAssessment) {
			isEdit = false;
		}

		let today = new Date();
		let interviewDate = new Date(interv.interviewDate);

		if (today < interviewDate) {
			isEdit = false;
		}

		setCanEdit(isEdit);
	}

	async function registerAppraiserAssessment() {
		const skillAssessments = {};

		for (const skill of skills) {
			skillAssessments[skill.skillName] = skill.skillMinAssessment;
		}

		await api.post(`Interviews/${id}/registerAssessment`, {
			appraiserId: appraiser,
			skillAssessments,
			finalAssessment: appraiserAssessment,
		});

		getData();
	}
	async function registerFinalAssessment() {
		const sure = confirm("Are you sure?");

		if (sure) {
			await api.post(`Interviews/${id}/finalAssessment`, {
				finalAssessment: finalAssessment,
				comment: finalComment,
			});

			getData();
		}
	}

	async function getEmployees() {
		const data = await api.get("Employees");
		setEmployees(data.data);
		setAppraiser(data.data[0].emplId);
	}

	async function getSkills(posId) {
		const data = await api.get(`Positions/${posId}`);

		for (const skill of data.data.skills) {
			skill.skillMinAssessment = 0;
		}

		setSkills(data.data.skills);
	}

	async function editSkills(skillName, val) {
		const a = skills.filter((x) => x.skillName == skillName)[0];
		a.skillMinAssessment = val;
		setSkills([...skills]);
	}

	async function getData() {
		const data = await api.get(`interviews/${id}`);
		getSkills(data.data.position?.positionId);
		console.log(data.data);

		setInterview(data.data);
		checkEdit(data.data);
	}

	function getRealAssessment(grade) {
		const mapp = new Map();
		mapp.set(5, "Yes");
		mapp.set(3, "Yes with opinion");
		mapp.set(1, "No");

		return mapp.get(grade);
	}

	useEffect(() => {
		getData();
		getEmployees();
	}, []);

	return (
		<div>
			<div>
				Applicant: {interview.applicant?.applicantName} {interview.applicant?.applicantSurname} {interview.applicant?.applicantLastname}
			</div>
			<div>Age: {interview.applicant?.applicantAge}</div>
			<div>Experiance: {interview.applicant?.applicantExperiance}</div>
			<div>Assessment: {interview.interviewAssessment}</div>
			<div>Date: {interview.interviewDate}</div>
			<div>Position: {interview.position?.positionName}</div>
			<div>
				<div>Appraisers:</div>
				<div className="px-8">
					{interview.appraisers?.map((appraiser, index) => (
						<div key={`appraiser-${index}`} className="py-2">
							<div>
								Appraiser: {appraiser?.emplName} {appraiser?.emplSurname} {appraiser?.emplLastname}
							</div>
							<div>Appraiser Assessment: {getRealAssessment(appraiser.appraiserAssessment)}</div>
							<div>
								<div>Assessments:</div>
								<div className="px-8">
									{appraiser.assessments?.map((assessment, index) => (
										<div key={`assessment-${index}`}>
											<div>
												{assessment.skilName} ({assessment.assessments})
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{canEdit && (
				<div className="flex flex-row">
					<div className="card bg-base-200 w-80">
						<div className="card-body">
							<p>Appraiser</p>
							<select
								onChange={(e) => {
									setAppraiser(e.target.value);
								}}
								className="select select-bordered w-full max-w-xs"
								value={appraiser}
							>
								{interview.appraisers.map((e, index) => (
									<option key={`employee-${index}`} value={e.emplId}>
										{e.emplName}
									</option>
								))}
							</select>

							{skills.map((skill, index) => (
								<div key={`skill-${index}`}>
									<div>
										{skill.skillName} : {skill.skillMinAssessment}
									</div>
									<div>
										<input
											value={skill.skillMinAssessment}
											onChange={(e) => {
												editSkills(skill.skillName, e.target.value);
											}}
											type="number"
											min={0}
											max={5}
											className="w-16 h-8 px-2"
										/>
									</div>
								</div>
							))}
							<p>Assessment</p>

							<select
								onChange={(e) => {
									setAppraiserAssessment(e.target.value);
								}}
								defaultValue={appraiserAssessment}
								className="select select-bordered w-full max-w-xs"
							>
								<option value={"Y"}>Yes</option>
								<option value={"I"}>Yes with opinion</option>
								<option value={"N"}>No</option>
							</select>
							<button onClick={registerAppraiserAssessment} className="btn btn-neutral">
								Assess
							</button>
						</div>
					</div>
					<div>
						<div className="card bg-base-200 w-80">
							<div className="card-body">
								<p>Assessment</p>
								<select
									onChange={(e) => {
										setFinalAssessment(e.target.value);
									}}
									defaultValue={finalAssessment}
									className="select select-bordered w-full max-w-xs"
								>
									<option value={"Y"}>Yes</option>
									<option value={"I"}>Yes with opinion</option>
									<option value={"N"}>No</option>
								</select>
								<input
									defaultValue={finalComment}
									placeholder="Comment"
									onChange={(e) => {
										setFinalComment(e.target.value);
									}}
									className="input input-bordered"
								/>
								<button onClick={registerFinalAssessment} className="btn btn-neutral">
									Final Assess
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
