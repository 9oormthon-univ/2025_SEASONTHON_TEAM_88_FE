import React, { useEffect, useMemo, useState } from 'react';
import giftbox from '../../assets/icons/giftbox.svg';
import { ReactComponent as CheckGray } from '../../assets/icons/check-round(gray).svg?react';
import { ReactComponent as CheckPurple } from '../../assets/icons/check-round.svg?react';
import ConfirmModal from '../ui/ConfirmModal';
import { createTodo, updateTodoStatus } from '../../apis/todoApi';

export default function PartyCard({ partyId, title, tasks = [], onAdd, onDelete, onProgressChange }) {
  const [internalTasks, setInternalTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const tasksJson = useMemo(() => JSON.stringify(tasks), [tasks]);

  useEffect(() => {
    const tasksArray = JSON.parse(tasksJson);

    // ✨ 1. 콘솔 로그 추가: 부모로부터 받은 원본 데이터를 확인합니다.
    // 여기서 각 객체에 isCompleted 키와 그 값이 (true/false) 올바르게 들어오는지 확인하세요.
    console.log('[PartyCard]  받은 원본 tasks:', tasksArray);

    const mappedTasks = tasksArray
      .map((task) => ({
        id: task.todoId,
        text: task.task || task.productName,
        isCompleted: task.isCompleted, // 🚨 API 응답 키가 'isComplete'가 아닌 'isCompleted'가 맞는지 확인!
      }))
      .filter((item) => item.id && item.text);

    // ✨ 2. 콘솔 로그 추가: UI 상태로 변환된 최종 데이터를 확인합니다.
    // 여기서 isCompleted 값이 제대로 매핑되었는지 확인하세요.
    console.log('[PartyCard] UI용으로 매핑된 internalTasks:', mappedTasks);

    setInternalTasks(mappedTasks);
  }, [tasksJson]);

  const total = internalTasks.length;
  const checkedCount = useMemo(() => internalTasks.filter((task) => task.isCompleted).length, [internalTasks]);
  const ratio = total > 0 ? checkedCount / total : 0;
  const done = ratio >= 1;

  const toggleCheck = async (todoId) => {
    const taskIndex = internalTasks.findIndex((t) => t.id === todoId);
    if (taskIndex === -1) return;

    const originalTasks = internalTasks;
    const newCompletedState = !originalTasks[taskIndex].isCompleted;

    try {
      await updateTodoStatus(todoId, newCompletedState);
      const updatedTasks = originalTasks.map((t) => (t.id === todoId ? { ...t, isCompleted: newCompletedState } : t));
      setInternalTasks(updatedTasks);
      const newCheckedCount = updatedTasks.filter((t) => t.isCompleted).length;
      const newRatio = updatedTasks.length > 0 ? newCheckedCount / updatedTasks.length : 0;
      onProgressChange?.(newRatio);
    } catch (error) {
      console.error('상태 업데이트에 실패했습니다.', error);
    }
  };

  const startAdding = () => !adding && setAdding(true);
  const cancelAdding = () => {
    setAdding(false);
    setNewText('');
  };

  const commitAdd = async () => {
    const t = newText.trim();
    if (!t || !partyId) return;

    try {
      const response = await createTodo({ partyId: partyId, task: t });
      if (response.isSuccess && response.result) {
        const newTodo = response.result;
        const newTaskList = [
          ...internalTasks,
          {
            id: newTodo.todoId,
            text: newTodo.task,
            isCompleted: newTodo.isCompleted,
          },
        ];
        setInternalTasks(newTaskList);
        const newCheckedCount = newTaskList.filter((t) => t.isCompleted).length;
        const newRatio = newTaskList.length > 0 ? newCheckedCount / newTaskList.length : 0;
        onProgressChange?.(newRatio);
        setNewText('');
        setAdding(false);
        onAdd?.(t);
      } else {
        console.error('Todo 추가 실패:', response.message);
      }
    } catch (error) {
      console.error('Todo 추가 API 호출 중 에러 발생:', error);
    }
  };

  const buttonDisabled = adding ? newText.trim().length === 0 : false;

  const BAR_TOTAL_REM = 18.5;
  const BAR_H_REM = 0.625;
  const BAR_R_REM = 1.0625;
  const GIFT_W_BASE = 2.46569;
  const GIFT_H_BASE = 2.46563;
  const GIFT_SCALE = 1.44;
  const GIFT_W = GIFT_W_BASE * GIFT_SCALE;
  const GIFT_H = GIFT_H_BASE * GIFT_SCALE;
  const clamped = Math.max(0, Math.min(1, ratio));
  const filledRem = clamped * BAR_TOTAL_REM;
  const giftLeft = useMemo(() => {
    if (clamped === 0) return -GIFT_W / 4;
    if (clamped === 1) return BAR_TOTAL_REM - GIFT_W / 2;
    return filledRem - GIFT_W / 2;
  }, [clamped, filledRem]);
  const filledWidth = Math.min(filledRem, BAR_TOTAL_REM);

  return (
    <>
      <section className="w-full rounded-[1.25rem] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <header className="flex items-center justify-between">
          <h3 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">{title}</h3>
        </header>

        <div className="mt-3">
          <div className="relative h-4">
            {done && (
              <span className="absolute left-0 font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#8371FD]">
                준비 완료
              </span>
            )}
            <span className="absolute right-0 font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#464B51]">
              {clamped === 0 ? '준비 시작' : done ? '' : '준비 중'}
            </span>
          </div>
          <div className="relative mt-1" style={{ width: `${BAR_TOTAL_REM}rem` }}>
            <div
              className="bg-[#EBEBEB]"
              style={{ width: `${BAR_TOTAL_REM}rem`, height: `${BAR_H_REM}rem`, borderRadius: `${BAR_R_REM}rem` }}
            />
            <div
              className="absolute left-0 top-0 bg-[#8371FD] transition-[width] duration-300"
              style={{ width: `${filledWidth}rem`, height: `${BAR_H_REM}rem`, borderRadius: `${BAR_R_REM}rem` }}
            />
            <img
              src={giftbox}
              alt="gift"
              className="absolute select-none pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
              style={{
                left: `${giftLeft}rem`,
                top: `-${GIFT_H / 2.15}rem`,
                width: `${GIFT_W}rem`,
                height: `${GIFT_H}rem`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <h4 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">
            준비 리스트
          </h4>
          <span
            className={`inline-flex w-[3.375rem] h-[1.4375rem] items-center justify-center rounded-[2rem] ${
              done ? 'bg-[#8371FD]' : 'bg-[#EFE8FF]'
            }`}
          >
            <span
              className={`font-pretendard text-[0.75rem] font-medium leading-[1.2rem] ${
                done ? 'text-white' : 'text-[#44388C]'
              }`}
            >
              {done ? '완료' : '진행중'}
            </span>
          </span>
        </div>

        <ul className="mt-3 space-y-2">
          {internalTasks.map((task) => {
            return (
              <li
                key={task.id}
                className="flex items-center justify-between rounded-[0.5rem] bg-[#F8F8F8] px-4 py-[0.625rem]"
                onClick={() => toggleCheck(task.id)}
              >
                <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem] text-[#191A1C]">
                  {task.text}
                </span>
                {task.isCompleted ? (
                  <CheckPurple className="w-[1.25rem] h-[1.25rem] shrink-0" />
                ) : (
                  <CheckGray className="w-[1.25rem] h-[1.25rem] shrink-0" />
                )}
              </li>
            );
          })}
          {adding && (
            <li className="flex items-center justify-between rounded-[0.5rem] bg-[#F8F8F8] px-4 py-[0.625rem]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelAdding();
                }}
                className="mr-2 text-[#9AA0A6] text-[1rem] leading-none"
                aria-label="입력 취소"
              >
                ×
              </button>
              <input
                autoFocus
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="편지 작성하기"
                className="flex-1 bg-transparent outline-none text-[#191A1C] placeholder:text-[#9AA0A6] font-pretendard text-[0.875rem]"
                onClick={(e) => e.stopPropagation()}
              />
              <CheckGray className="ml-2 w-[1.25rem] h-[1.25rem] shrink-0" />
            </li>
          )}
        </ul>

        <button
          type="button"
          disabled={buttonDisabled}
          onClick={adding ? commitAdd : startAdding}
          aria-disabled={buttonDisabled}
          className={[
            'mt-4 flex w-[18.0625rem] h-[2.375rem] items-center justify-center',
            'rounded-[2rem]',
            'bg-[#81878B] text-white',
            buttonDisabled ? 'cursor-not-allowed opacity-70' : 'active:opacity-90',
          ].join(' ')}
        >
          <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem]">리스트 추가하기</span>
        </button>
        <div className="mt-2 text-right">
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#81878B] underline"
          >
            파티 삭제
          </button>
        </div>
      </section>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete?.();
        }}
        title="파티를 삭제하시겠습니까?"
        description="삭제 후에는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
