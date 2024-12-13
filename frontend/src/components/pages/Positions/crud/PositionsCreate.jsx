import { useState } from "react";
import { getApi } from "../../../../api/apiInstance";

export default function PositionsCreate({ refresh }) {
	const api = getApi();

	const [positionName, setPositionName] = useState("");
	const [skills, setSkills] = useState([]);
	const [chooseSkill, setChooseSkill] = useState("React");
	const [chooseSkillAssessment, setChooseSkillAssessment] = useState(0);

	async function addPosition() {
		await api.post("positions/register", {
			positionName,
			skills,
		});
		refresh();
	}

	async function addSkill(e) {
		const set = new Set(skills);
		set.add({
			skillName: chooseSkill,
			skillMinAssessment: chooseSkillAssessment,
		});
		setSkills(Array.from(set));
	}

	return (
		<div>
			<div className="card bg-base-200 w-80">
				<div className="card-body">
				
					<input
						defaultValue={positionName}
						onChange={(e) => {
							setPositionName(e.target.value);
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
					<button onClick={addPosition} className="btn btn-neutral">
						Create
					</button>
				</div>
			</div>
		</div>
	);
}
