import { render, screen } from "@testing-library/react";
import BotMessage, { LoadingMessage, BaseMessage } from "../BotMessage";
import "@testing-library/jest-dom";

describe("BotMessage", () => {
  it("renders message correctly with animation", async () => {
    const message = "Hello, World!";
    const { getByText, findByText } = render(<BotMessage message={message} />);

    // Make sure the message is not fully rendered at first
    expect(() => getByText(message)).toThrow();

    // Wait for the animation to finish and verify the final message is rendered
    const finalMessage = await findByText(message);
    expect(finalMessage).toBeInTheDocument();
  });
});

describe("LoadingMessage", () => {
  it("renders loading dots correctly with animation", async () => {
    const { getByText, findByText } = render(<LoadingMessage />);

    expect(() => getByText("...")).toThrow();

    // Make sure only 1 dots are rendered at first
    const initialMessage = await findByText(".");
    expect(initialMessage).toBeInTheDocument();
    expect(initialMessage.textContent).toHaveLength(1);

    // Make sure only 1 dots are rendered at first
    const nextMessage = await findByText("..");
    expect(nextMessage).toBeInTheDocument();
    expect(nextMessage.textContent).toHaveLength(2);

    // Wait for the animation to finish and verify the final message is rendered
    const finalMessage = await findByText("...");
    expect(finalMessage).toBeInTheDocument();
    expect(finalMessage.textContent).toHaveLength(3);

    // Make sure only 1 dots are rendered at first
    const repeatedMessage = await findByText(".");
    expect(repeatedMessage).toBeInTheDocument();
    expect(repeatedMessage.textContent).toHaveLength(1);
  });
});

describe("BaseMessage", () => {
  it("renders message correctly", () => {
    const message = "Hello, World!";
    const { getByText } = render(<BaseMessage message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
});
