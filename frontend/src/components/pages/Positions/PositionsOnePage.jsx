import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getApi } from "../../../api/apiInstance";

export default function PositionsOnePage() {
	const api = getApi();

	const { id } = useParams();

	const [position, setPosition] = useState({});
	const [summary, setSummary] = useState({});
	const [name, setName] = useState("");
	const [skills, setSkills] = useState([]);
	const [chooseSkill, setChooseSkill] = useState([]);
	const [chooseSkillAssessment, setChooseSkillAssessment] = useState([]);

	async function getSummary() {
		const data = await api.get(`positions/${id}/summary`);
		setSummary(data.data);
	}
	async function getData() {
		const data = await api.get(`positions/${id}`);
		setPosition(data.data);
		setSkills(data.data.skills);
		setName(data.data.positionName);
	}
	async function editPosition() {
		const ePosition = position;
		ePosition.skills = skills;
		ePosition.positionName = name;
		await api.put(`positions/${id}`, ePosition);
	}

	async function addSkill(e) {
		const set = new Set(skills);
		set.add({
			skillName: chooseSkill,
			skillMinAssessment: chooseSkillAssessment,
		});
		setSkills(Array.from(set));
	}

	async function editSkills(skillName, val) {
		const a = skills.filter((x) => x.skillName == skillName)[0];
		a.skillMinAssessment = val;
		setSkills([...skills]);
	}

	useEffect(() => {
		getData();
		getSummary();
	}, []);

	return (
		<div>
			<div>Id: {id}</div>
			<div>Name: {position.positionName}</div>
			<div>
				Candidates: {summary.candidateCount} | Average Skill Assessment: {summary.averageSkillAssessment}
			</div>

			<div className="flex flex-row">
				<div className="card bg-base-200 w-80">
					<div className="card-body">
						<input
							defaultValue={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							placeholder="Position Name"
							className="input input-bordered"
						/>
						<div>
							{skills.map((skill, index) => (
								<div key={`skill-${index}`}>
									<div className="badge badge-primary">
										{skill.skillName} : {skill.skillMinAssessment}
									</div>
								</div>
							))}
						</div>
						<input
							defaultValue={chooseSkill}
							onChange={(e) => {
								setChooseSkill(e.target.value);
							}}
							placeholder="Skill"
							className="input input-bordered"
						/>
						<input
							defaultValue={chooseSkillAssessment}
							onChange={(e) => {
								setChooseSkillAssessment(e.target.value);
							}}
							type="number"
							min={0}
							max={5}
							placeholder="Skill Assessment"
							className="input input-bordered"
						/>
						<button onClick={addSkill} className="btn btn-neutral">
							Add Skill
						</button>
						<button onClick={editPosition} className="btn btn-neutral">
							Edit
						</button>
					</div>
				</div>

				<div className="card bg-base-200 w-80">
					<div className="card-body">
						<div>
							{skills.map((skill, index) => (
								<div key={`skill-${index}`}>
									<div>
										{skill.skillName} : {skill.skillMinAssessment}
									</div>
									<div>
										<input
											defaultValue={skill.skillMinAssessment}
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
						</div>
						<button onClick={editPosition} className="btn btn-neutral">
							Edit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
