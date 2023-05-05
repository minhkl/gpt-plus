"use client";
import cx from "clsx";
import type { Model } from "openai";

import { useOpenAISettingsContext } from "@/contexts/openAISettingsContext";
import { ChangeEvent } from "react";

type IProps = {
  className?: string;
  models: Model[];
};

export default function SideBar({ className, models }: IProps) {
  const { settings, setModel, setTemperature } = useOpenAISettingsContext();

  const handleChangeModel = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };
  const handleChangeTemperature = (e: ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseInt(e.target.value) / 10);
  };

  return (
    <div className={cx(className, "border-l border-l-neutral p-4 w-96 h-full")}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Model</span>
        </label>
        <select
          className="select select-bordered"
          value={settings.model}
          onChange={handleChangeModel}
        >
          {models.map((model) => (
            <option key={model.id}>{model.id}</option>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-xs mt-4">
        <label className="label">
          <span className="label-text">Temperture</span>
          <span className="label-text-alt">{settings.temperature}</span>
        </label>
        <input
          type="range"
          min={0}
          max={10}
          value={settings.temperature * 10}
          className="range range-xs"
          step={1}
          onChange={handleChangeTemperature}
        />
      </div>
    </div>
  );
}
