'use client';

import style from "./style.module.css";

interface ClientComponentProps {
  isActive: boolean;
  index: number;
  onClick: (index: number) => void;
}

export default function SButton({ isActive, index, onClick }: ClientComponentProps) {
  return (
    <button className={isActive ? style.stopButtonColored : style.stopButton} onClick={() => onClick(index)}>Stop {index + 1}</button>
  );
}