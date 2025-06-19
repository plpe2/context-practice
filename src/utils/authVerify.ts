export async function authVerify(token: string) {
  try {
    const response = await fetch("/api/verify-auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If server responded with error (e.g. 401), return error
      return { success: false, error: data.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error",
    };
  }
}
