import { useState } from "react";
import { jobTypeLabels, jobTypeOptions, workTypeLabels, workTypeOptions } from "../../data/jobs";
import type { JobFilters, JobType, WorkType } from "../../types/job";
import { Panel, SectionTitle } from "./ui";

type JobFilterPanelProps = {
  filters: JobFilters;
  skillSearch: string;
  onSkillSearchChange: (value: string) => void;
  onToggleSkill: (value: string) => void;
  onToggleJobType: (value: JobType) => void;
  onToggleWorkType: (value: WorkType) => void;
  onLocationChange: (value: string) => void;
  onReset: () => void;
  availableSkills?: Array<{ _id: string; name: string }>;
};

function CheckboxRow({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onClick}
        className="h-4 w-4 rounded border-line text-primary focus:ring-primary"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

export function JobFilterPanel({
  filters,
  skillSearch,
  onSkillSearchChange,
  onToggleSkill,
  onToggleJobType,
  onToggleWorkType,
  onLocationChange,
  onReset,
  availableSkills,
}: JobFilterPanelProps) {
  const [isSkillInputFocused, setIsSkillInputFocused] = useState(false);
  const normalizedSkillSearch = skillSearch.trim().toLowerCase();
  const selectedSkills = Array.from(new Set(filters.skills));
  const filteredSkills = (availableSkills ?? []).filter((skill) =>
    skill.name.toLowerCase().includes(normalizedSkillSearch)
  );
  const shouldShowSkillOptions = (isSkillInputFocused || skillSearch.length > 0) && filteredSkills.length > 0;

  return (
    <Panel className="p-5">
      <div className="space-y-5">
        <SectionTitle title="Bộ lọc công việc" subtitle="Tinh chỉnh danh sách theo nhu cầu của bạn." />

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-slate-900">Kỹ năng</h3>
            <span className="text-xs font-medium text-slate-500">{selectedSkills.length} đã chọn</span>
          </div>

          <div className="rounded-2xl border border-line bg-slate-50 p-3">
            {selectedSkills.length > 0 ? (
              <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
                {selectedSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => onToggleSkill(skill)}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                    aria-label={`Bỏ chọn ${skill}`}
                  >
                    <span>{skill}</span>
                    <span aria-hidden="true" className="text-base leading-none">x</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="px-1 py-2 text-sm text-slate-500">Chưa chọn kỹ năng nào</p>
            )}
          </div>

          <div className="relative">
            <input
              value={skillSearch}
              onChange={(event) => onSkillSearchChange(event.target.value)}
              onFocus={() => setIsSkillInputFocused(true)}
              onBlur={() => setIsSkillInputFocused(false)}
              placeholder="Tìm kiếm kỹ năng..."
              className="h-11 w-full rounded-xl border border-line bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
            />

            {shouldShowSkillOptions && (
              <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-56 overflow-y-auto rounded-xl border border-line bg-white shadow-lg">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkills.includes(skill.name);

                  return (
                    <button
                      key={skill._id}
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        onToggleSkill(skill.name);
                      }}
                      className={`flex w-full items-center justify-between gap-3 border-b border-slate-100 px-4 py-2.5 text-left text-sm transition last:border-b-0 ${
                        isSelected
                          ? "bg-blue-50 font-semibold text-primary"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{skill.name}</span>
                      {isSelected && <span className="text-xs font-bold text-primary">Đã chọn</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">Địa điểm</h3>
          <input
            value={filters.location}
            onChange={(event) => onLocationChange(event.target.value)}
            placeholder="Hà Nội, TP HCM..."
            className="h-11 w-full rounded-xl border border-line bg-slate-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
          />
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-900">Hình thức làm việc</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold uppercase text-slate-400">Job type</p>
              {jobTypeOptions.map((jobType) => (
                <CheckboxRow
                  key={jobType}
                  checked={filters.jobTypes.includes(jobType)}
                  label={jobTypeLabels[jobType]}
                  onClick={() => onToggleJobType(jobType)}
                />
              ))}
            </div>
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold uppercase text-slate-400">Work mode</p>
              {workTypeOptions.map((workType) => (
                <CheckboxRow
                  key={workType}
                  checked={filters.workTypes.includes(workType)}
                  label={workTypeLabels[workType]}
                  onClick={() => onToggleWorkType(workType)}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="flex items-center gap-3 border-t border-line pt-4">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Xóa tất cả
          </button>
        </div>
      </div>
    </Panel>
  );
}
