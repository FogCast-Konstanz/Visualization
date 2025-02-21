export const enLexicon = {
    title: "Lexicon",
    predictedTime: {
        title: 'Predicted time',
        text: 'Time to which the prediction refers, i.e. at which the predicted value should occur. For example: On 24/02/2025 at 12:00 it should be 12°C. In this case, "24/12/2025 at 12 noon" is the predicted time.'
    },
    timeOfPrediction: {
        title: 'Time of the prediction',
        text: 'Time at which the prediction was "published/created". For example, a prediction for 24/02/2025 is created on 12/02/2025. "12/02/2025" is the time of the prediction and "24/05/2025" is the [predicted time](#predictedTime).'
           },
    benchmarkingIdea: {
        title: 'Numerische Benchmarks für Wettermodelle',
        text: `
Weather models are complex systems that attempt to predict the future development of the atmosphere. Numerical benchmarks can be used to assess the quality of these predictions. These benchmarks compare the models' predictions with actual observations and rank the models based on their accuracy. 

### What are numerical benchmarks?

Numerical benchmarks are quantitative assessments that measure the performance of weather models against real observational data. They provide an objective basis for comparing different models and determining which model provides the best forecasts in certain situations or over a certain period of time.

### Methodology in the background

The basic idea behind numerical benchmarks is simple: 

1. collect forecasts: The forecasts of different weather models for a specific time and location are collected.
2. collect observations: Real weather observations (e.g. temperature, wind speed) for the same time and location are obtained from reliable sources such as weather stations or satellites.
3. comparison and evaluation: The predictions of the models are compared with the actual observations. Statistical metrics such as the mean square error (MSE) or the negative log-likelihood (NLL) are used to assess how well the predictions match the observations.
4. create a ranking list: The models are ranked based on their evaluation results. The model with the lowest MSE or the highest NLL is considered the most accurate. The values can be categorised into different time spans in order to make statements with a higher information content: (some models may perform better for long-term forecasts but are less good for short-term forecasts)

- Short-term forecasts (up to 24 hours)
- Medium-term forecasts (24-72 hours)
- Long-term forecasts (over 72 hours)

###  Extension of benchmarks

In the simplest version, benchmarks can be calculated and saved using a handful of variables for different time periods with one metric. To make the benchmarks more precise and meaningful, 1 more variables can be used, which may be weighted differently. In addition, the forecasts in the different time periods can be weighted according to their distance from the predicted point in time. Many other measures can be taken to make the assessment of the forecasts as precise and meaningful as possible.

### Interpretation of results

The practical application of the benchmark system is carried out via script sequences that enable an automated daily comparison of model performance. These can be viewed via the web interface. The benchmark scores can also be used, for example, to weight the statements of individual models based on their average historical benchmark scores when merging models.
`    }
}