import { useEffect, useState } from "react";

const EmailHistory = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/email", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                const data = await res.json();
                if (data.success) {
                    setEmails(data.emails);
                }
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    if (loading) return <p>Loading email history...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Email History</h2>
            {emails.length === 0 ? (
                <p>No emails found.</p>
            ) : (
                emails.map((email) => (
                    <div
                        key={email._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <h4>{email.subject || "No Subject"}</h4>
                        <p>{email.generatedContent}</p>
                        <small>
                            {new Date(email.createdAt).toLocaleString()}
                        </small>
                    </div>
                ))
            )}
        </div>
    );
};

export default EmailHistory;