// src/pages/intro/SignupForm.jsx
import React, { useMemo, useState } from "react";
import ChevronLeft from "../../assets/icons/chevron-left.svg";
import CheckSmall from "../../assets/icons/check-small.svg";
import WarningSmall from "../../assets/icons/warning-small.svg";
import Button from "../../components/ui/Button";

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

  /* ------------------------ validators ------------------------ */
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

  const nameOk  = useMemo(() => /^[A-Za-z가-힣]+$/.test(form.name), [form.name]);
  const phoneOk = useMemo(() => /^01[016789]-\d{3,4}-\d{4}$/.test(form.phone), [form.phone]);
  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email), [form.email]);

  const allOk = idOk && pwOk && pw2Ok && nameOk && phoneOk && emailOk;

  /* ------------------------ handlers ------------------------ */
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
      setForm((f) => ({ ...f, phone: out.slice(0, 13) }));
      return;
    }

    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  /* ---------------------- style helpers ---------------------- */
  const baseInput =
    "w-full h-11 rounded-xl bg-white px-3 outline-none text-black placeholder:text-[#81878B] " +
    "font-pretendard text-[16px] leading-[1.2] border-[1.5px] transition-colors";
  const borderCls = (ok, touched) =>
    touched ? (ok ? "border-[#1DBE8B]" : "border-[#FF5C5C]") : "border-[#E3E6EA] focus:border-[#7F6BFF]";

  const fieldWrap = "mb-6";
  const labelCls =
    "block font-pretendard text-[0.875rem] leading-[1.2rem] text-[#191A1C] font-medium mb-2";
  const helperCls = "mt-1 text-[12px] text-[#8B90A0]";

  /* --------------------------- UI ---------------------------- */
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTouched({ id: true, password: true, password2: true, name: true, phone: true, email: true });
          if (!allOk) return;
          alert("회원가입 정보가 유효합니다. (데모)");
        }}
        className="w-[22.5rem] px-5 pt-12 pb-8"
        autoComplete="off"
      >
        {/* Header */}
        <div className="mb-6">
          <button type="button" aria-label="뒤로가기" className="p-2 -m-2">
            <img src={ChevronLeft} alt="뒤로가기" className="w-5 h-5" />
          </button>
          <h1 className="mt-2 font-pretendard text-[1.25rem] font-semibold leading-[1.75rem]">
            회원정보를 입력해주세요
          </h1>
        </div>

        {/* 아이디 */}
        <div className={fieldWrap}>
          <label className={labelCls}>아이디</label>
          <div className="relative">
            <input
              name="id"
              maxLength={10}
              placeholder="아이디"
              value={form.id}
              onChange={onChange}
              onBlur={onBlur}
              className={`${baseInput} ${borderCls(idOk, touched.id)}`}
            />
            {touched.id && (
              <img
                src={idOk ? CheckSmall : WarningSmall}
                alt={idOk ? "valid" : "invalid"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
              />
            )}
          </div>
          <p className={helperCls}>*띄어쓰기 없이 영/숫자 6-10자</p>
          {touched.id && !idOk && <p className="mt-1 text-[12px] text-[#FF5C5C]">사용 불가능한 아이디입니다.</p>}
        </div>

        {/* 비밀번호 */}
        <div className={fieldWrap}>
          <label className={labelCls}>비밀번호</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              maxLength={15}
              placeholder="비밀번호"
              value={form.password}
              onChange={onChange}
              onBlur={onBlur}
              className={`${baseInput} rounded-t-xl ${borderCls(pwOk, touched.password)} border-b-0`}
            />
            {touched.password && (
              <img
                src={pwOk ? CheckSmall : WarningSmall}
                alt={pwOk ? "valid" : "invalid"}
                className="absolute right-3 top-[22px] w-5 h-5"
              />
            )}
          </div>

          <div className="relative -mt-px">
            <input
              type="password"
              name="password2"
              maxLength={15}
              placeholder="비밀번호 확인"
              value={form.password2}
              onChange={onChange}
              onBlur={onBlur}
              className={`${baseInput} rounded-b-xl ${borderCls(pw2Ok, touched.password2)}`}
            />
            {touched.password2 && (
              <img
                src={pw2Ok ? CheckSmall : WarningSmall}
                alt={pw2Ok ? "valid" : "invalid"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
              />
            )}
          </div>

          <p className={helperCls}>*8~15자의 영문, 숫자 또는 특수문자 조합</p>
          {touched.password && !pwOk && (
            <p className="mt-1 text-[12px] text-[#FF5C5C]">조건에 맞는 비밀번호를 입력해주세요.</p>
          )}
          {touched.password2 && !pw2Ok && (
            <p className="mt-1 text-[12px] text-[#FF5C5C]">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        {/* 이름 */}
        <div className={fieldWrap}>
          <label className={labelCls}>이름</label>
          <div className="relative">
            <input
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={onChange}
              onBlur={onBlur}
              className={`${baseInput} ${borderCls(nameOk, touched.name)}`}
            />
            {touched.name && (
              <img
                src={nameOk ? CheckSmall : WarningSmall}
                alt={nameOk ? "valid" : "invalid"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
              />
            )}
          </div>
          {touched.name && !nameOk && (
            <p className="mt-1 text-[12px] text-[#FF5C5C]">특수기호/공백은 사용할 수 없어요.</p>
          )}
        </div>

        {/* 휴대폰 번호 */}
        <div className={fieldWrap}>
          <label className={labelCls}>휴대폰 번호</label>
          <div className="relative">
            <input
              name="phone"
              inputMode="numeric"
              placeholder="휴대폰 번호"
              value={form.phone}
              onChange={onChange}
              onBlur={onBlur}
              className={`${baseInput} ${borderCls(phoneOk, touched.phone)}`}
            />
            {touched.phone && (
              <img
                src={phoneOk ? CheckSmall : WarningSmall}
                alt={phoneOk ? "valid" : "invalid"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
              />
            )}
          </div>
          {touched.phone && !phoneOk && (
            <p className="mt-1 text-[12px] text-[#FF5C5C]">휴대폰번호를 정확히 입력해주세요.</p>
          )}
        </div>

        {/* 이메일 */}
        <div className="mb-8">
          <label className={labelCls}>이메일</label>
          <div className="relative">
            <input
              name="email"
              inputMode="email"
              placeholder="이메일"
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              className={`${baseInput} ${borderCls(emailOk, touched.email)}`}
            />
            {touched.email && (
              <img
                src={emailOk ? CheckSmall : WarningSmall}
                alt={emailOk ? "valid" : "invalid"}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
              />
            )}
          </div>
          {touched.email && !emailOk && (
            <p className="mt-1 text-[12px] text-[#FF5C5C]">잘못된 이메일 형식입니다.</p>
          )}
        </div>

        {/* 완료 버튼 */}
        <Button variant="step" isActive={allOk} isFinal disabled={!allOk}>
          완료
        </Button>
      </form>
    </div>
  );
}