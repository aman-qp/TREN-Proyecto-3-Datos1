namespace TrainServer.Entities
{
    public class RoutesDB
    {
        public static List<TrainRoute> routes = new() {
            new TrainRoute("Paraíso", "Cartago"),
            new TrainRoute("Cartago", "Paraíso"),
            new TrainRoute("Cartago", "Tres Rios"),
            new TrainRoute("Tres Rios", "Cartago"),
            new TrainRoute("Tres Rios", "Curridabat"),
            new TrainRoute("Curridabat", "Tres Rios"),
            new TrainRoute("Curridabat", "San Pedro"),
            new TrainRoute("San Pedro", "Curridabat"),
            new TrainRoute("San Pedro", "Guadalupe"),
            new TrainRoute("Guadalupe", "San Pedro"),
            new TrainRoute("San Pedro", "San José"),
            new TrainRoute("San José", "San Pedro"),
            new TrainRoute("Tres Rios", "Sabanilla"),
            new TrainRoute("Sabanilla", "Guadalupe"),
            new TrainRoute("Sabanilla", "San Pedro"),
            new TrainRoute("Sabanilla", "San José"),
            new TrainRoute("Tres Rios", "Zapote"),
            new TrainRoute("Zapote", "Tres Rios"),
            new TrainRoute("Zapote", "San José"),
            new TrainRoute("San José", "Zapote"),
            new TrainRoute("Tibás", "San José"),
            new TrainRoute("San José", "Tibás"),
            new TrainRoute("Tibás", "Santo Domingo"),
            new TrainRoute("Santo Domingo", "Tibás"),
            new TrainRoute("Santo Domingo", "Heredia"),
            new TrainRoute("Heredia", "Santo Domingo"),
            new TrainRoute("Moravia", "Tibás"),
            new TrainRoute("Moravia", "Guadalupe"), 
            new TrainRoute("Guadalupe", "Moravia"),
            new TrainRoute("Moravia", "San Vicente"),
        };
    }
}
