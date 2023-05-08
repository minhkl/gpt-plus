import { act, renderHook } from "@testing-library/react";
import useTypingText from "../useTypingText";

const DELAY = 500;

describe.only("useTypingText", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useFakeTimers();
  });

  it("should return the full input string if animate option is false", () => {
    // Test code goes here
    const { result } = renderHook(() => useTypingText("Hello!", { animate: false }));

    expect(result.current).toEqual("Hello!");
  });

  it("should return a string with increasing length if animate option is true", () => {
    const { result } = renderHook(() => useTypingText("Hello!", { animate: true, delay: DELAY }));

    expect(result.current).toEqual("");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("H");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("He");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("Hel");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("Hell");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("Hello");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("Hello!");
  });

  it("should restart the animation if repeat option is true", () => {
    const { result } = renderHook(() =>
      useTypingText("Hello!", { animate: true, repeat: true, delay: DELAY })
    );

    expect(result.current).toEqual("");

    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));

    expect(result.current).toEqual("Hello!");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("");
  });

  it("should not restart the animation if repeat option is false", () => {
    const { result } = renderHook(() =>
      useTypingText("Hello!", { animate: true, repeat: false, delay: DELAY })
    );

    expect(result.current).toEqual("");

    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));

    expect(result.current).toEqual("Hello!");

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("Hello!");
  });

  it("should stop animated if the component is unmounted", () => {
    const { result, unmount } = renderHook(() =>
      useTypingText("Hello!", { animate: true, repeat: false, delay: DELAY })
    );

    act(() => jest.advanceTimersByTime(DELAY));
    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("He");

    unmount();

    act(() => jest.advanceTimersByTime(DELAY));
    expect(result.current).toEqual("He");
  });
});
