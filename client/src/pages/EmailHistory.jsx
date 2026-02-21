import { useEffect, useState } from "react";

const EmailHistory = () => {
    const [search, setSearch] = useState("");
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tone, setTone] = useState("");

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/email?search=${search}&tone=${tone}`,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );

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
    }, [search, tone]);

    if (loading) return <p>Loading email history...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Email History</h2>
            <input
                type="text"
                placeholder="Search emails..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "8px",
                    width: "100%",
                    maxWidth: "400px",
                    marginBottom: "20px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                }}
            />
            <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={{
                    padding: "8px",
                    marginLeft: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                }}
            >
                <option value="">All Tones</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
                <option value="professional">Professional</option>
            </select>
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