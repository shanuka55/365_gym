import { useState } from "react";

const MembershipAgreement = () => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>365 Fitness - Membership Agreement</h2>

            <form
                action="YOUR_FORMSPREE_ENDPOINT"
                method="POST"
            >
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <textarea
                    readOnly
                    value={`PASTE YOUR FULL TERMS & CONDITIONS HERE`}
                    style={{
                        width: "100%",
                        height: "150px",
                        marginBottom: "10px"
                    }}
                />

                <label style={{ display: "block", marginBottom: "10px" }}>
                    <input
                        type="checkbox"
                        required
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    {" "}I agree to the Terms & Conditions
                </label>

                <input
                    type="text"
                    name="signature"
                    placeholder="Type Full Name as Digital Signature"
                    required
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <button
                    type="submit"
                    disabled={!agreed}
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#000",
                        color: "#fff",
                        border: "none"
                    }}
                >
                    Submit Agreement
                </button>
            </form>
        </div>
    );
};

export default MembershipAgreement;