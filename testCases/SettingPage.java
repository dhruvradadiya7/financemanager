package fmSelTest;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;


public class SettingPage {
	
	static WebDriver driver;
	static WebElement stgBtn,addBtn;
	
	@BeforeClass
	public static void setup() {
		SetupDrivers.setup();
	}
	
	@Before
	public void startNew() throws InterruptedException {
		driver = new ChromeDriver();
		String baseUrl = "https://finance-manger.vercel.app/signin";
        driver.get(baseUrl);
        Thread.sleep(3000);
        driver.findElement(By.tagName("body")).sendKeys(Keys.TAB,Keys.TAB,"Testuser@gmail.com",Keys.TAB,"test123");
        driver.findElement(By.className("colored-icon-big-button")).click();    
	}

//	@Test
//	public void addingMonth() throws InterruptedException {
//		Thread.sleep(3000);
//		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
//		stgBtn.click();
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
//		addBtn.click();
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("January");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("25000");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
//		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/p")).getText();
//		Assert.assertEquals("January",valid);
//	}
//	
//	@Test
//	public void addingMonthWithoutAmount() throws InterruptedException {
//		Thread.sleep(3000);
//		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
//		stgBtn.click();
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
//		addBtn.click();
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("January");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
//		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[3]")).getText();
//		Assert.assertEquals("Please enter Amount field to save!",valid);
//	}
//	
//	@Test
//	public void addingMonthWithoutTitle() throws InterruptedException {
//		Thread.sleep(3000);
//		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
//		stgBtn.click();
//		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
//		addBtn.click();
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("33333");
//		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
//		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[3]")).getText();
//		Assert.assertEquals("Please enter Title field to save!",valid);
//	}
	
	@Test
	public void addingExpenceCategorie() throws InterruptedException {
		Thread.sleep(3000);
		stgBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/button[2]"));
		stgBtn.click();
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/button[2]")).click();
		addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[1]/div/button[1]"));
		addBtn.click();
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/input")).sendKeys("Rent");
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[2]/input")).sendKeys("350");
		driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[3]/button[1]")).click();
		String valid = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[2]/div[2]/div[2]/div[1]/p")).getText();
		Assert.assertEquals("Rent",valid);
	}
	
	@After
	public void close() {
		driver.quit();
	}

}
