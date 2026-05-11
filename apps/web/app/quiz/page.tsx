import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Quiz tu van chon san pham",
  description:
    "Quiz gom goal, concern va preferred format de dua ra recommendation va chuan bi handoff neu can.",
  path: "/quiz"
});

const questions = [
  "Muc tieu hien tai cua ban la gi?",
  "Cam giac hoac moi quan tam lon nhat luc nay la gi?",
  "Ban muon bat dau bang shot, juice hay combo?"
];

export default function QuizPage() {
  return (
    <div className="container section stack">
      <section className="card page-intro stack">
        <span className="eyebrow">Embedded AI advisor</span>
        <h1 className="title-md">Quiz la diem lay context, khong phai form lay lead vo hon.</h1>
        <p className="lead">
          Du lieu tu trang nay can duoc day vao customer profile, recommendation result va admin note de CSKH tiep
          quan khong dut mach.
        </p>
      </section>
      <section className="grid story-grid">
        {questions.map((question, index) => (
          <article className="card stack" key={question}>
            <span className="chip">Buoc {index + 1}</span>
            <h2 className="title-sm">{question}</h2>
            <p className="lead">
              UI thuc te o phase tiep theo se noi API `/api/quiz/recommend` va luu context ve customer record.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}

