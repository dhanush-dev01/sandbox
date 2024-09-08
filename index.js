module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        const reqBody = req.body;

        if (!reqBody) {
            context.res = {
                status: 400,
                body: {
                    error: "Invalid request body"
                }
            };
            return;
        }

        const { feedback, overall_score } = evaluateUserInput(reqBody);

        // Return feedback and overall score
        context.res = {
            status: 200,
            body: {
                feedback,
                overall_score
            }
        };

    } catch (error) {
        context.log(`Error: ${error.message}`);
        context.res = {
            status: 500,
            body: {
                error: `An error occurred: ${error.message}`
            }
        };
    }
};

// Function to evaluate the user input and return feedback and score
function evaluateUserInput(data) {
    let total_score = 0;
    const max_score = 100;  // Maximum score for the evaluation
    let feedback = [];

    // App Service Name validation and scoring
    const app_service_name = data.app_service_name;
    if (!app_service_name) {
        feedback.push("App Service name is required.");
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(app_service_name) || app_service_name.length > 60) {
        feedback.push("App Service name must be alphanumeric and under 60 characters.");
        total_score += 0;
    } else {
        feedback.push("App Service name is valid.");
        total_score += 30;
    }

    // App Service Plan evaluation and scoring
    const app_service_plan = data.app_service_plan;
    const valid_plans = {
        "Free": { score: 10, effectiveness: "Low" },
        "Shared": { score: 20, effectiveness: "Moderate" },
        "Premium": { score: 40, effectiveness: "High" }
    };

    if (!valid_plans[app_service_plan]) {
        feedback.push(`Invalid App Service Plan. Choose from ${Object.keys(valid_plans).join(', ')}.`);
    } else {
        const plan_info = valid_plans[app_service_plan];
        feedback.push(`App Service Plan '${app_service_plan}' selected with ${plan_info.effectiveness} effectiveness.`);
        total_score += plan_info.score;
    }

    // Resource Group validation (no score, just feedback)
    const resource_group = data.resource_group;
    if (!resource_group) {
        feedback.push("Resource Group is required.");
    }

    // Region validation and scoring
    const region = data.region;
    const valid_regions = {
        "East US": 10,
        "West US": 10,
        "Central US": 5,
        "East Asia": 5
    };

    if (!valid_regions[region]) {
        feedback.push(`Invalid Region. Choose from ${Object.keys(valid_regions).join(', ')}.`);
    } else {
        feedback.push(`Region '${region}' selected.`);
        total_score += valid_regions[region];
    }

    // Runtime Environment validation and scoring
    const runtime = data.runtime;
    const valid_runtimes = {
        "Python": 10,
        "Node.js": 10,
        ".NET": 10,
        "Java": 10
    };

    if (!valid_runtimes[runtime]) {
        feedback.push(`Invalid Runtime. Choose from ${Object.keys(valid_runtimes).join(', ')}.`);
    } else {
        feedback.push(`Runtime '${runtime}' selected.`);
        total_score += valid_runtimes[runtime];
    }

    // Calculate overall score as a percentage
    const overall_score = (total_score / max_score) * 100;

    return { feedback, overall_score };
}
