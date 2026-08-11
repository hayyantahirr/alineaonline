"use client";

export default function LevelBoardTabs({
  levels,
  activeLevel,
  activeBoard,
  onSelectLevel,
  onSelectBoard,
}) {
  const currentLevel = levels.find((l) => l.id === activeLevel);
  const boards = currentLevel?.boards || [];

  return (
    <div className="flex flex-col gap-4">
      {/* Level Tabs */}
      <div>
        <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-2">
          Level
        </span>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => {
            const isActive = level.id === activeLevel;
            return (
              <button
                key={level.id}
                onClick={() => onSelectLevel(level.id)}
                className={`font-['Work_Sans'] text-xs font-bold px-4 py-2 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#c0392b] text-white border-[#c0392b] shadow-[3px_3px_0_0_var(--color-on-background)]"
                    : "bg-white text-on-background border-line hover:border-on-background/40"
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Board Tabs */}
      {boards.length > 0 && (
        <div>
          <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-2">
            Exam Board
          </span>
          <div className="flex flex-wrap gap-2">
            {boards.map((board) => {
              const isActive = board.id === activeBoard;
              return (
                <button
                  key={board.id}
                  onClick={() => onSelectBoard(board.id)}
                  className={`font-['IBM_Plex_Mono'] text-[11px] font-bold px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary-container text-on-background border-on-background shadow-[2px_2px_0_0_var(--color-on-background)]"
                      : "bg-white text-on-surface-variant border-line hover:border-on-background/40 hover:bg-[#f5f2e9]"
                  }`}
                >
                  {board.label}
                  {board.syllabus && (
                    <span className="ml-1.5 opacity-60">({board.syllabus})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
