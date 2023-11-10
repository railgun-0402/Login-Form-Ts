/**
 * 【Loginテストケース】
 *  1. [ログイン-正常系]ログインができること
 *    1-1. 正しいIDとPWを入力すると、ログインが成功する
 *  2. [ログイン-異常系]ログインができないこと
 *    2-1. 誤ったIDを入力した場合
 *    2-2. 誤ったPWを入力した場合
 *    2-3. IDが未入力だった場合
 *    2-4. PWが未入力だった場合
 *    2-5. IDが入力されてるが、3文字未満の場合バリデーションエラーが発生すること
 *    2-6. PWが入力されてるが、6文字未満の場合バリデーションエラーが発生すること
 *    2-7. PWが入力されてるが、12文字以上の場合バリデーションエラーが発生すること
 *    2-8. IDとPW両方ともバリデーションエラーの場合、文言がそれぞれ確認できること
 *  3. [クリア-正常系]クリアボタンを押すと文字列が消えること
 *    3-1. 任意のIDとPWを入力した状態でクリアボタンを押すと、文字列が消えること
 */
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

//useNavigateモック
const mockedUseNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigator,
}));

describe("[ログイン-正常系]ログインができること", () => {
  test("1-1:正しいIDとPWを入力すると、ログインが成功する", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // テキストに正しいID/PW入力(awaitをつけないと、先にボタンがクリックされる)
    await userEvent.type(screen.getByLabelText("ユーザーID"), "root");
    await userEvent.type(screen.getByLabelText("パスワード"), "123456");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() =>
      expect(mockedUseNavigator).toHaveBeenCalledWith("/Success")
    );
  });
});

describe("[ログイン-異常系]ログインができないこと", () => {
  test("2-1:誤ったIDを入力した場合", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // ID:誤、PW:正
    await userEvent.type(screen.getByLabelText("ユーザーID"), "invalid");
    await userEvent.type(screen.getByLabelText("パスワード"), "123456");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("ユーザIDもしくはパスワードが間違ってます!")
      ).toBeInTheDocument();
    });
  });

  test("2-2:誤ったPWを入力した場合", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // ID:正、PW:誤
    await userEvent.type(screen.getByLabelText("ユーザーID"), "root");
    await userEvent.type(screen.getByLabelText("パスワード"), "987654");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("ユーザIDもしくはパスワードが間違ってます!")
      ).toBeInTheDocument();
    });
  });

  test("2-3:IDが未入力だった場合", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // ID:未入力
    await userEvent.type(screen.getByLabelText("パスワード"), "123456");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("IDは必ず入力してください。")
      ).toBeInTheDocument();
    });
  });

  test("2-4:PWが未入力だった場合", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // PW:未入力
    await userEvent.type(screen.getByLabelText("ユーザーID"), "root");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("パスワードは必ず入力してください。")
      ).toBeInTheDocument();
    });
  });

  test("2-5:IDが入力されてるが、3文字未満の場合バリデーションエラーが発生すること", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // ID:3文字未満
    await userEvent.type(screen.getByLabelText("ユーザーID"), "r");
    await userEvent.type(screen.getByLabelText("パスワード"), "123456");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("IDは3文字以上で入力してください。")
      ).toBeInTheDocument();
    });
  });

  test("2-6:PWが入力されてるが、6文字未満の場合バリデーションエラーが発生すること", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // PW:12文字以上
    await userEvent.type(screen.getByLabelText("ユーザーID"), "root");
    await userEvent.type(screen.getByLabelText("パスワード"), "123");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("パスワードは6文字以上で入力してください。")
      ).toBeInTheDocument();
    });
  });

  test("2-7:PWが入力されてるが、12文字以上の場合バリデーションエラーが発生すること", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // PW:12文字以上
    await userEvent.type(screen.getByLabelText("ユーザーID"), "root");
    await userEvent.type(screen.getByLabelText("パスワード"), "01234565678912");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("パスワードは12文字以内で入力してください。")
      ).toBeInTheDocument();
    });
  });

  test("2-8:IDとPW両方ともバリデーションエラーの場合、文言がそれぞれ確認できること", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // PW:12文字以上
    await userEvent.type(screen.getByLabelText("ユーザーID"), "r");
    await userEvent.type(screen.getByLabelText("パスワード"), "123");

    // ログインボタン押下
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("IDは3文字以上で入力してください。")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("パスワードは6文字以上で入力してください。")
      ).toBeInTheDocument();
    });
  });
});

describe("[クリア-正常系]クリアボタンを押すと文字列が消えること", () => {
  test("3-1. 任意のIDとPWを入力した状態でクリアボタンを押すと、文字列が消えること", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // テキストに正しいID/PW入力(awaitをつけないと、先にボタンがクリックされる)
    await userEvent.type(screen.getByLabelText("ユーザーID"), "root");
    await userEvent.type(screen.getByLabelText("パスワード"), "123456");

    // ログインボタン押下
    userEvent.click(screen.getByText("クリア"));
    userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => {
      expect(
        screen.getByText("IDは必ず入力してください。")
      ).toBeInTheDocument();
    });
  });
});
