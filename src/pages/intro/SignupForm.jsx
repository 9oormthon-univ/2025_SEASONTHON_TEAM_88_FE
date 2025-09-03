// src/pages/intro/SignupForm.jsx
import React, { useMemo, useState } from "react";
// 아이콘 파일
import WarningSmall from "../../assets/icons/warning-small.svg";
import CheckSmall from "../../assets/icons/check-small.svg";
import ChevronLeft from "../../assets/icons/chevron-left.svg";
import Button from "../../components/ui/Button"; // ✅ 공용 버튼

export default function SignupForm() {
  const [form, setForm] = useState({
    id: "",
    password: "",
    password2: "",
    name: "",
    phone: "",
    email: "",
  });
  const [touched, setTouched] = useState({
    id: false,
    password: false,
    password2: false,
    name: false,
    phone: false,
    email: false,
  });

  // ------- validators -------
  const idOk = useMemo(() => /^[A-Za-z0-9]{6,10}$/.test(form.id.trim()), [form.id]);

  const pwOk = useMemo(() => {
    const v = form.password;
    if (v.length < 8 || v.length > 15) return false;
    if (/\s/.test(v)) return false;
    const hasAlpha = /[A-Za-z]/.test(v);
    const hasNum = /[0-9]/.test(v);
    const hasSp = /[^A-Za-z0-9]/.test(v);
    return [hasAlpha, hasNum, hasSp].filter(Boolean).length >= 2;
  }, [form.password]);

  const pw2Ok = useMemo(
    () => form.password2.length > 0 && form.password2 === form.password,
    [form.password2, form.password]
  );

  const nameOk = useMemo(() => /^[A-Za-z가-힣]+$/.test(form.name), [form.name]);
  const phoneOk = useMemo(() => /^01[016789]-\d{3,4}-\d{4}$/.test(form.phone), [form.phone]);
  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email), [form.email]);

  const allOk = idOk && pwOk && pw2Ok && nameOk && phoneOk && emailOk;

  // ------- handlers -------
  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      let out = digits;
      if (digits.length >= 3 && digits.length <= 7) {
        out = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      } else if (digits.length >= 8) {
        out = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
      }
      setForm((f) => ({ ...f, [name]: out.slice(0, 13) }));
      return;
    }

    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  // ------- border 상태 유틸 -------
  const borderState = (ok, isTouched) =>
    isTouched ? (ok ? "border-emerald-500" : "border-red-500") : "border-[#B1B7BC]";

  return (
    <div className="flex justify-center items-start min-h-screen bg-white py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTouched({
            id: true,
            password: true,
            password2: true,
            name: true,
            phone: true,
            email: true,
          });
          if (!allOk) return;
          alert("회원가입 정보가 유효합니다. (데모)");
        }}
        className="w-[23.4375rem] bg-white pb-8 px-5"
        autoComplete="off"
      >
        {/* 헤더 */}
        <div className="pt-2 mb-6">
          <button type="button" aria-label="뒤로가기" className="cursor-pointer mb-3">
            <img src={ChevronLeft} alt="뒤로가기" className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold leading-7">
            <span>회원정보를 입력해주세요</span>
          </h1>
        </div>

        {/* ===== ID ===== */}
        <div className="mb-6">
          <label className="block font-['Pretendard'] text-[0.75rem] leading-[1.2rem] text-[#81878B] mb-1">
            ID (띄어쓰기 없이 영/숫자 6-10자)
          </label>
          <div
            className={`relative flex items-center rounded-md border-[1.5px] bg-white h-11 w-full px-3 ${borderState(
              idOk,
              touched.id
            )}`}
          >
            <input
              name="id"
              maxLength={10}
              placeholder="아이디"
              value={form.id}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full outline-none bg-transparent text-black text-base placeholder:text-[#81878B]"
            />
            {touched.id && (
              <img
                src={idOk ? CheckSmall : WarningSmall}
                alt={idOk ? "valid" : "invalid"}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
              />
            )}
          </div>
          {touched.id && !idOk && (
            <p className="text-xs text-red-500 mt-1">사용 불가능한 아이디입니다.</p>
          )}
        </div>

        {/* ===== Passwords ===== */}
        <div className="mb-6">
          <label className="block font-['Pretendard'] text-[0.75rem] leading-[1.2rem] text-[#81878B] mb-1">
            비밀번호 (8~15자의 영문, 숫자 또는 특수문자 조합)
          </label>

          {/* 상단 비밀번호 */}
          <div
            className={`relative flex items-center rounded-t-md border-[1.5px] bg-white h-11 w-full px-3 border-b-0 ${borderState(
              pwOk,
              touched.password
            )}`}
          >
            <input
              type="password"
              name="password"
              maxLength={15}
              placeholder="비밀번호"
              value={form.password}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full outline-none bg-transparent text-black text-base placeholder:text-[#81878B]"
            />
            {touched.password && (
              <img
                src={pwOk ? CheckSmall : WarningSmall}
                alt={pwOk ? "valid" : "invalid"}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
              />
            )}
          </div>

          {/* 하단 비밀번호 재입력 */}
          <div
            className={`relative -mt-px flex items-center rounded-b-md border-[1.5px] bg-white h-11 w-full px-3 ${borderState(
              pw2Ok,
              touched.password2
            )}`}
          >
            <input
              type="password"
              name="password2"
              maxLength={15}
              placeholder="비밀번호 재입력"
              value={form.password2}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full outline-none bg-transparent text-black text-base placeholder:text-[#81878B]"
            />
            {touched.password2 && (
              <img
                src={pw2Ok ? CheckSmall : WarningSmall}
                alt={pw2Ok ? "valid" : "invalid"}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
              />
            )}
          </div>

          {touched.password && !pwOk && (
            <p className="text-xs text-red-500 mt-1">
              8~15자의 영문, 숫자 또는 특수문자 조합을 사용해주세요.
            </p>
          )}
          {touched.password2 && !pw2Ok && (
            <p className="text-xs text-red-500 mt-1">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        {/* ===== 이름 ===== */}
        <div className="mb-6">
          <div
            className={`relative flex items-center rounded-md border-[1.5px] bg-white h-11 w-full px-3 ${borderState(
              nameOk,
              touched.name
            )}`}
          >
            <input
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full outline-none bg-transparent text-black text-base placeholder:text-[#81878B]"
            />
            {touched.name && (
              <img
                src={nameOk ? CheckSmall : WarningSmall}
                alt={nameOk ? "valid" : "invalid"}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
              />
            )}
          </div>
          {touched.name && !nameOk && (
            <p className="text-xs text-red-500 mt-1">특수기호, 공백 사용 불가</p>
          )}
        </div>

        {/* ===== 휴대폰 ===== */}
        <div className="mb-6">
          <div
            className={`relative flex items-center rounded-md border-[1.5px] bg-white h-11 w-full px-3 ${borderState(
              phoneOk,
              touched.phone
            )}`}
          >
            <input
              name="phone"
              inputMode="numeric"
              placeholder="휴대폰 번호"
              value={form.phone}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full outline-none bg-transparent text-black text-base placeholder:text-[#81878B]"
            />
            {touched.phone && (
              <img
                src={phoneOk ? CheckSmall : WarningSmall}
                alt={phoneOk ? "valid" : "invalid"}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
              />
            )}
          </div>
          {touched.phone && !phoneOk && (
            <p className="text-xs text-red-500 mt-1">휴대폰번호를 정확히 입력해주세요.</p>
          )}
        </div>

        {/* ===== 이메일 ===== */}
        <div className="mb-8">
          <div
            className={`relative flex items-center rounded-md border-[1.5px] bg-white h-11 w-full px-3 ${borderState(
              emailOk,
              touched.email
            )}`}
          >
            <input
              name="email"
              inputMode="email"
              placeholder="이메일"
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full outline-none bg-transparent text-black text-base placeholder:text-[#81878B]"
            />
            {touched.email && (
              <img
                src={emailOk ? CheckSmall : WarningSmall}
                alt={emailOk ? "valid" : "invalid"}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6"
              />
            )}
          </div>
          {touched.email && !emailOk && (
            <p className="text-xs text-red-500 mt-1">잘못된 이메일 형식입니다.</p>
          )}
        </div>

        {/* 완료 버튼 (공용 버튼 사용) */}
        <Button
          variant="step"
          isActive={allOk}
          isFinal={true}
          disabled={!allOk}
        >
          완료
        </Button>
      </form>
    </div>
  );
}