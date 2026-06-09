class ShadowHost extends HTMLElement {

    constructor() {

        super();

        const shadow =
            this.attachShadow({
                mode: "open"
            });

        shadow.innerHTML = `

        <style>

            .card{
                border:1px solid #ccc;
                border-radius:8px;
                padding:20px;
                margin:10px 0;
                background:#fafafa;
            }

            input,
            select{
                width:100%;
                padding:10px;
                margin:8px 0;
            }

            button{
                padding:10px 15px;
                cursor:pointer;
            }

            .result{
                margin-top:10px;
                color:green;
                font-weight:bold;
            }

        </style>

        <div class="card">

            <h3 id="shadowTitle">
                Open Shadow Root
            </h3>

            <input
                id="shadowInput"
                placeholder="Enter Name">

            <select id="shadowRole">

                <option>QA</option>
                <option>Developer</option>
                <option>DevOps</option>
                <option>Manager</option>

            </select>

            <label>

                <input
                    id="shadowCheckbox"
                    type="checkbox">

                Automation Engineer

            </label>

            <br><br>

            <button id="shadowBtn">

                Submit

            </button>

            <div
                id="shadowResult"
                class="result">

            </div>

        </div>
        `;

        const button =
            shadow.getElementById(
                "shadowBtn"
            );

        button.addEventListener(
            "click",
            () => {

                const name =
                    shadow
                        .getElementById(
                            "shadowInput"
                        )
                        .value;

                const role =
                    shadow
                        .getElementById(
                            "shadowRole"
                        )
                        .value;

                shadow
                    .getElementById(
                        "shadowResult"
                    )
                    .innerText =

                    `User: ${name} | Role: ${role}`;

            }
        );
    }
}

customElements.define(
    "shadow-host",
    ShadowHost
);