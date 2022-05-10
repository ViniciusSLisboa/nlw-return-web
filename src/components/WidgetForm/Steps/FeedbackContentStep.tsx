import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedBackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedBackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedbackComment(e: FormEvent) {
    e.preventDefault();

    setIsSendingFeedback(true)

    await api.post('/feedbacks', {
      type: feedbackType,
      comment: feedbackComment,
      screenshot
    })

    setIsSendingFeedback(false)
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="submit"
          onClick={onFeedbackRestartRequested}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedbackComment} className="my-4 w-full">
        <textarea
          className="min-w-[384px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-400 bg-transparent rounded-sm focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          value={feedbackComment}
          onChange={(e) => setFeedbackComment(e.target.value)}
        />

        <footer className="flex gap-2 mt-2 ">
          <ScreenshotButton
            onScreenshotTook={setScreenshot}
            screenshot={screenshot}
          />
          <button
            disabled={feedbackComment.length == 0 || isSendingFeedback}
            type="button"
            onClick={handleSubmitFeedbackComment}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
